import { developmentUrl, getWebsiteHost, ProductionUrl } from '@/constant/environment';
import { isEmpty } from '@/utils/is';
import { Flex, useToast,Text,Image, Button, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import utf8 from 'utf8';

const WebLoginWallet = () => {
  const router = useRouter();
  const toast = useToast();
  const ref = useRef<any>(null);
  const { deviceId, lang, tz, version, platform,env } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [initLoading,setInitLoading] = useState<boolean>(true)
  const [account,setAccount] = useState<string>('');
  const [signature,setSignature] = useState<string>('')
  const { isOpen,onClose,onOpen } = useDisclosure();
  const [error,setError] = useState<string>('');


  const onMetaMask = useCallback( async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const { ethereum } = window as any;

      if (!ethereum) {
        toast({
          duration: 3000,
          position: 'top',
          render: () => {
            return <InstallMetamask />;
          },
        });

        return;
      }
  
      const [account] = await ethereum?.request({ method: 'eth_requestAccounts' });

      const instance = axios.create({
        baseURL: env === 'development' ? developmentUrl:ProductionUrl,
      });
      if (!deviceId) {
        return;
      }
      const res = await instance.get(
        `/v1/users/wallet/nonce?address=${account}`,
        {
          headers: {
            'oc-device-id': deviceId as string,
            'oc-client-lang': lang as string,
            'oc-client-tz': tz as string,
            'oc-client-version': version as string,
            'oc-client-platform': platform as string,
          },
        },
      );

      const nonce = res?.data?.nonce;
      const hexerMessage = utf8.encode(nonce);
      const signature = await ethereum?.request({
        method: 'personal_sign',
        params: [hexerMessage, account],
      });

      setAccount(account);
      setSignature(signature);

      if(ref.current) {
        setTimeout(()=> {
          ref.current.click();
        },10)
      }
    } catch (e) {
      // todo
      const { response } = e as any;
      const { code,message } = response?.data;
      
      if(code === 6005) {
        const params = JSON.parse(message);
        setError(message);
        onOpen()
      }
    } finally {
      setLoading(false);
    }
  },[deviceId, env, lang, loading, onOpen, platform, toast, tz, version])

  const onClick = useCallback(()=> {
    if(!isEmpty(account) && !isEmpty(signature)) {
      window.open(
        `opencord://open?account=${account}&signature=${signature}`,
        '_self'
      );
    }
  },[account, signature])

  const openElectron = useMemo(()=> {
    return (
      <Flex justifyContent="center" direction="column" align="center">
      <Text mt="140px" color="#ffffff" fontWeight="700" fontSize="20px" lineHeight="25px">
        You are being redirected to the authorized application. 
      </Text>
      <Flex mt="50px" fontWeight="400" fontSize="16px" lineHeight="20px" color="rgba(255, 255, 255, 0.5)">
        If your browser does not redirect you back, please 
        <Text m="0 3px" cursor="pointer" color="rgb(122,172,234)" _hover={{
          "text-decoration": "underline"
        }} onClick={onClick}>click here</Text>
        to continue.
      </Flex>
    </Flex>
    )
  },[onClick])

  const connectText = useMemo(()=> {
    return (
      <Flex justifyContent="center" direction="column" align="center">
        <Text mt="140px" color="#ffffff" fontWeight="700" fontSize="20px" lineHeight="25px">This is an on-chain action</Text>
        <Text mt="50px" fontWeight="400" fontSize="16px" lineHeight="20px" color="rgba(255, 255, 255, 0.5)">Please connect your Ethereum wallet first.</Text>
        <Button isLoading={loading || initLoading} onClick={onMetaMask} mt="60px" width="360px" height="30px" borderRadius="4px" fontWeight="600" fontSize="14px">Connect Wallet</Button>
      </Flex>
    )
  },[initLoading, loading, onMetaMask])

  useEffect(() => {
    const timerID = setInterval(() => {
      if (document?.readyState === 'complete') {
        const { ethereum:eth } = window as any
        if (eth._state.initialized === true) {
          clearInterval(timerID);
          setInitLoading(false);
          onMetaMask();
        } else {
          router.reload();
        }
      }
    }, 1000);

    return ()=> {
      clearInterval(timerID);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <Flex w="100vw" h="100vh" bg="url(/imgs/login/login_bg.svg)" align="center" direction="column">
      <Flex align="center" mt="140px">
        <Image src="/imgs/login/login_opencord.svg" alt=''  width="218px" height="48px" />
      </Flex>
      {
        signature?openElectron:connectText
      }
      <WaitListDialog onClose={()=> {
        onClose();
      }} isOpen={isOpen} text={error} env={env as string} />
      <Flex ref={ref} onClick={onClick}></Flex>
    </Flex>
  )
};



export const InstallMetamask = () => {
  return (
    <Flex
      height="30px"
      bg="#FF3737"
      borderRadius="30px"
      padding="6px 17px"
      align="center"
    >
      <Text fontSize="14px" lineHeight="18px">
        &nbsp;No MetaMask installed.&nbsp;
      </Text>
      <Text
        fontWeight="bold"
        fontSize="14px"
        lineHeight="18px"
        cursor="pointer"
        onClick={() => {
          window.open('https://metamask.io/download/');
        }}
      >
        Go to INSTALL→
      </Text>
    </Flex>
  );
};

export const WaitListDialog = (props:{
  onClose: () => void;
  isOpen: boolean;
  text: string;
  env:string;
})=> {
  const { onClose, isOpen,text='',env } = props;

  const ref = useRef(null)
  const webList = getWebsiteHost(env);
  const { title,message,button } = jsonDecode(text);

  return (
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={ref}
    onClose={onClose}
    isCentered
  >
    <AlertDialogOverlay>
      <AlertDialogContent width="400px" borderRadius="5px" bg="#282828">
        <AlertDialogBody
          padding="20px"
          height="auto"
          borderRadius="4px"
          bg="#282828"
          color="#ffffff"
        >
           <Box>
            
           <Flex align="center">

           <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="25px"
            color="#FFFFFF"
            textTransform="capitalize"
            >
             {title}
           </Text>

          </Flex>

          <Text
            fontSize={'14px'}
            lineHeight={'18px'}
            marginTop={"20px"}
            color="rgba(255, 255, 255, 0.5)"
            fontWeight={"400"}>
            {message}
          </Text>
          
            <Button width="100%" _focus={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none'
            }}  height="30px"mt="20px" color="#1b1b1b" onClick={()=> {
              window.open(`${webList}/waitlist`);
              
              close()
            }}>{button}</Button>
          </Box>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
   
  )
}

export default WebLoginWallet;

function jsonDecode(json: string): any {
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
}