import { useToast } from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useCallback, useState } from "react";

import { TextToast } from "@/components/common";
import { InstallMetamask } from "@/components/wallet";
import { useWalletDialog } from "@/hooks/dialog/wallet/useWalletDialog";
import {
  bindWallet,
  getUserBaseInfo,
  getWalletAuthorizedNonce,
  verifyWallet,
} from "@/net/http/gateway";
import { useStore } from "@/store";
import { isEmpty, jsonDecode, removeLocal } from "@/utils";
import { utf8ToHex } from "@/utils/encode";

import { CommonError } from "../../common";
import { WalletSign } from "../../delete-account";
import { ChooseWalletList, HasWalletText, NoWalletText } from "../../verify";

export const ConnectWallet = () => {
  const toast = useToast();
  const {
    controllBindDialog,
    emailCredential,
    modifyUserInfo,
    updateBindStatus,
    updateBindCredential,
  } = useStore((state) => {
    return {
      controllBindDialog: state.controllBindDialog,
      emailCredential: state.emailCredential,
      modifyUserInfo: state.modifyUserInfo,
      updateBindStatus: state.updateBindStatus,
      updateBindCredential: state.updateBindCredential,
    };
  });
  const [message, setMessage] = useState<string>("");
  const { bindTarget } = useStore((state) => {
    return {
      bindTarget: state.bindTarget,
    };
  });

  const [disable, setDisable] = useState(false);
  const [nextDialog, setNextDialog] = useState<string>();
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const { InvalidSigntrue } = useWalletDialog();

  const getCredential = useCallback(
    async (address: string, signature: string) => {
      if (bindTarget === "bindWallet") {
        const bindWalletResult = await bindWallet({
          address,
          signature,
          credential: emailCredential,
        });
        if (bindWalletResult.code) {
          if (
            bindWalletResult.code === 6007 ||
            bindWalletResult.code === 6006
          ) {
            setMessage(bindWalletResult.message);
            setDisable(false);

            return;
          }

          toast({
            position: "top",
            render: () => {
              return <TextToast text={bindWalletResult.message} />;
            },
          });
          setDisable(false);

          return;
        }
        const { data: userProfile } = await getUserBaseInfo({ userId: "@me" });
        if (!isEmpty(userProfile.walletAddress)) {
          modifyUserInfo(userProfile);
          controllBindDialog(false);
        }
      }
      if (bindTarget === "bindEmail") {
        const result = await verifyWallet({ address, signature });
        const { credential: walletCredential } = result.data;
        if (isEmpty(walletCredential)) {
          return;
        }
        updateBindCredential(walletCredential);
        updateBindStatus("email");
      }
    },
    [
      bindTarget,
      emailCredential,
      toast,
      modifyUserInfo,
      controllBindDialog,
      updateBindCredential,
      updateBindStatus,
    ]
  );

  const metaMaskSign = useCallback(async () => {
    setDisable(true);
    const provider = await detectEthereumProvider();
    if (!provider) {
      toast({
        position: "top",
        render: () => {
          return <InstallMetamask />;
        },
      });
      setDisable(true);

      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window?.ethereum as any;
    let account: string[] = [];
    try {
      account = await win.request({ method: "eth_requestAccounts" });
    } catch (error) {
      setDisable(false);
      throw error;
    }

    if (isEmpty(account)) {
      setDisable(false);

      return;
    }

    const message = await getWalletAuthorizedNonce({
      address: account[0],
      type: bindTarget === "bindEmail" ? 2 : 3,
    });
    if (message.code === 6007 || message.code === 6006) {
      setMessage(message?.message);
      setDisable(false);

      return;
    }
    const { nonce = "" } = message?.data ?? {};
    if (isEmpty(nonce)) {
      setDisable(false);

      return;
    }
    const hexerMessage = utf8ToHex(nonce);

    if (isEmpty(hexerMessage)) {
      setDisable(false);

      return;
    }

    let signature = "";
    try {
      signature = await win.request({
        method: "personal_sign",
        params: [hexerMessage, account[0]],
      });
    } catch (error) {
      setDisable(false);
    }

    if (isEmpty(signature)) {
      setDisable(false);

      return;
    }

    getCredential(account[0], signature);
  }, [bindTarget, getCredential, toast]);

  const wallectConnectSign = useCallback(async () => {
    if (connector) {
      try {
        const message = await getWalletAuthorizedNonce({
          address: connector.accounts[0],
          type: bindTarget === "bindEmail" ? 2 : 3,
        });

        if (message.code === 6007 || message.code === 6006) {
          setMessage(message?.message);
          setDisable(false);

          return;
        }

        const { nonce = "" } = message?.data ?? {};

        const hexerMessage = utf8ToHex(nonce);

        if (isEmpty(hexerMessage)) {
          setDisable(false);

          return;
        }

        let signature = "";
        try {
          signature = await connector.signPersonalMessage([
            hexerMessage,
            connector.accounts[0],
          ]);
        } catch (error) {
          setDisable(false);
        }
        if (isEmpty(signature)) {
          setDisable(false);

          return;
        }
        getCredential(connector.accounts[0], signature);
      } catch (e) {
        console.log(e);
      }
    }
  }, [bindTarget, connector, getCredential]);

  const onWalletConnect = useCallback(async () => {
    setDisable(true);
    // eslint-disable-next-line no-useless-catch
    try {
      removeLocal("walletconnect", true);
    } catch (error) {
      throw error;
    }

    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      connector.createSession();
    } else {
      setConnector(connector);
      setNextDialog("sign");
    }

    connector.on("connect", async () => {
      if (connector.connected && connector.accounts.length >= 1) {
        setConnector(connector);
        setNextDialog("sign");
      }
    });

    setDisable(false);
  }, []);

  const onNext = useCallback(async () => {
    try {
      if (connector) {
        await wallectConnectSign();
      } else {
        await metaMaskSign();
      }
    } catch (e) {
      InvalidSigntrue();
    }
  }, [connector, wallectConnectSign, metaMaskSign, InvalidSigntrue]);

  if (message) {
    const errorMessage = jsonDecode(message);

    return (
      <CommonError
        {...errorMessage}
        onClose={() => {
          setMessage("");
          setNextDialog("");
        }}
      />
    );
  }

  if (nextDialog === "sign") {
    return (
      <WalletSign
        onClose={() => {
          controllBindDialog(false);
        }}
        onNext={onNext}
      />
    );
  }

  return (
    <ChooseWalletList
      onMetaMask={async () => {
        setNextDialog("sign");
      }}
      onWalletConnect={async () => {
        if (!disable) {
          await onWalletConnect();
        }
      }}
      content={bindTarget === "bindEmail" ? NoWalletText : HasWalletText}
      onClose={() => {
        controllBindDialog(false);
      }}
      showNoWallet={bindTarget !== "bindEmail"}
    />
  );
};
