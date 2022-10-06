import client from "./client";
import * as components from "./gatewayComponents";
export * from "./gatewayComponents";

/**
 * @description "Load Balancer Health Check"
 */
export function index() {
  return client.get<null>("/");
}

/**
 * @description "Sign up"
 * @param req
 */
export function signUp(req: components.SignUpRequest) {
  return client.post<components.SignUpResponse>("/v1/users/signup", req);
}

/**
 * @description "Sign in with email"
 * @param req
 */
export function signInWithEmail(req: components.SignInWithEmailRequest) {
  return client.post<components.EmailSignInResponse>(
    "/v1/users/signin/email",
    req
  );
}

/**
 * @description "Sign in with wallet"
 * @param req
 */
export function signInWithWallet(req: components.SignInWithWalletRequest) {
  return client.post<components.WalletSignInResponse>(
    "/v1/users/signin/wallet",
    req
  );
}

/**
 * @description "Get original message of signature before login with wallet"
 * @param params
 */
export function getWalletNonce(params: components.GetWalletNonceRequestParams) {
  return client.get<components.GetWalletNonceResponse>(
    "/v1/users/wallet/nonce",
    params
  );
}

/**
 * @description "Verify wallet"
 * @param req
 */
export function verifyWallet(req: components.VerifyWalletRequest) {
  return client.post<components.VerifyWalletResponse>(
    "/v1/users/wallet/verify",
    req
  );
}

/**
 * @description "Send verification email"
 * @param req
 */
export function sendEmail(req: components.SendEmailRequest) {
  return client.post<null>("/v1/users/email/send", req);
}

/**
 * @description "Verify email verification code"
 * @param req
 */
export function verifyEmail(req: components.VerifyEmailRequest) {
  return client.post<components.VerifyEmailResponse>(
    "/v1/users/email/verify",
    req
  );
}

/**
 * @description "Get qrcode for login"
 * @param params
 */
export function getSignInQrCode(
  params: components.GetSignInQrCodeRequestParams
) {
  return client.get<components.QrCode>("/v1/users/qrcode/signin", params);
}

/**
 * @description "Get qrcode status"
 * @param params
 */
export function getQrCodeStatus(
  params: components.GetQrCodeStatusRequestParams
) {
  return client.get<components.QrCodeStatus>("/v1/users/qrcode/status", params);
}

/**
 * @description "Upload device info"
 * @param req
 */
export function uploadDeviceInfo(req: components.UploadDeviceInfoRequest) {
  return client.post<null>("/v1/users/device", req);
}

/**
 * @description "Apply to join the waitlist"
 * @param req
 */
export function applyJoinWaitlist(req: components.ApplyJoinWaitlistRequest) {
  return client.post<null>("/v1/users/waitlist", req);
}

/**
 * @description "Get the global configuration of the app"
 */
export function getAppConfig() {
  return client.get<components.AppConfig>("/v1/app/config");
}

/**
 * @description "Delete Account"
 * @param req
 */
export function deleteUser(req: components.DeleteUserRequest) {
  return client.delete<null>("/v1/users", req);
}

/**
 * @description "Get user's config"
 */
export function getUserConfig() {
  return client.get<components.UserConfig>("/v1/users/config");
}

/**
 * @description "Get IM token"
 */
export function getIMToken() {
  return client.get<components.GetIMTokenResponse>("/v1/users/im/token");
}

/**
 * @description "Scan QrCode"
 * @param req
 */
export function scanQrCode(req: components.QrCode) {
  return client.post<components.ScanQrCodeResponse>(
    "/v1/users/qrcode/scan",
    req
  );
}

/**
 * @description "Confirm QrCode"
 * @param req
 */
export function confirmQrCode(req: components.ConfirmQrCodeRequest) {
  return client.post<null>("/v1/users/qrcode/confirm", req);
}

/**
 * @description "Get user's profile"
 * @param params
 */
export function getUserProfile(params: components.UserProfileRequestParams) {
  return client.get<components.UserProfile>(
    "/v1/users/:userId/profile",
    params
  );
}

/**
 * @description "Get user's base info"
 * @param params
 */
export function getUserBaseInfo(
  params: components.GetUserBaseInfoRequestParams
) {
  return client.get<components.UserBaseInfo>("/v1/users/:userId/base", params);
}

/**
 * @description "Modify user's profile"
 * @param params
 * @param req
 */
export function modifyUserProfile(
  params: components.ModifyUserProfileRequestParams,
  req: components.ModifyUserProfileRequest
) {
  return client.patch<null>("/v1/users/:userId/profile", params, req);
}

/**
 * @description "Modify user's remark name"
 * @param req
 */
export function modifyUserRemark(req: components.ModifyUserRemarkRequest) {
  return client.put<null>("/v1/users/remark", req);
}

/**
 * @description "Bind Email"
 * @param req
 */
export function bindEmail(req: components.BindEmailRequest) {
  return client.post<null>("/v1/users/email/bind", req);
}

/**
 * @description "Bind Wallet"
 * @param req
 */
export function bindWallet(req: components.BindWalletRequest) {
  return client.post<null>("/v1/users/wallet/bind", req);
}

/**
 * @description "Bind Twitter"
 * @param req
 */
export function bindTwitter(req: components.BindTwitterRequest) {
  return client.post<null>("/v1/users/twitter/bind", req);
}

/**
 * @description "Get user's ens"
 * @param params
 */
export function getUserEns(params: components.GetUserEnsRequestParams) {
  return client.get<components.UserEnsInfo>("/v1/users/:userId/ens", params);
}

/**
 * @description "Get user's ERC-20 tokens"
 * @param params
 */
export function getUserTokens(params: components.GetUserTokensRequestParams) {
  return client.get<components.UserTokenInfo>(
    "/v1/users/:userId/token",
    params
  );
}

/**
 * @description "Get user's nfts"
 * @param params
 */
export function getUserNFTs(params: components.GetUserNFTsRequestParams) {
  return client.get<components.UserNFTInfo>("/v1/users/:userId/nft", params);
}

/**
 * @description "Get user's poaps"
 * @param params
 */
export function getUserPOAPs(params: components.GetUserPOAPsRequestParams) {
  return client.get<components.UserPOAPInfo>("/v1/users/:userId/poap", params);
}

/**
 * @description "Get setting of privacy"
 * @param params
 */
export function getUserPrivacySetting(
  params: components.UserPrivacySettingRequestParams
) {
  return client.get<components.UserPrivacySetting>(
    "/v1/users/:userId/settings/privacy",
    params
  );
}

/**
 * @description "Modify setting of privacy"
 * @param params
 * @param req
 */
export function modifyUserPrivacySetting(
  params: components.ModifyUserPrivacySettingRequestParams,
  req: components.ModifyUserPrivacySettingRequest
) {
  return client.patch<null>("/v1/users/:userId/settings/privacy", params, req);
}

/**
 * @description "Get server direct message setting of privacy"
 * @param params
 */
export function getServerPrivacySetting(
  params: components.ServerPrivacySettingRequestParams
) {
  return client.get<components.ServerPrivacySetting>(
    "/v1/users/:userId/settings/privacy/servers",
    params
  );
}

/**
 * @description "Modify server direct message setting of privacy"
 * @param params
 * @param req
 */
export function modifyServerPrivacySetting(
  params: components.ModifyServerPrivacySettingRequestParams,
  req: components.ModifyServerPrivacySettingRequest
) {
  return client.put<null>(
    "/v1/users/:userId/settings/privacy/servers",
    params,
    req
  );
}

/**
 * @description "Get setting of notifications"
 * @param params
 */
export function getUserNotificationSetting(
  params: components.UserNotificationSettingRequestParams
) {
  return client.get<components.UserNotificationSettingResponse>(
    "/v1/users/:userId/settings/notifications",
    params
  );
}

/**
 * @description "Modify setting of notifications"
 * @param params
 * @param req
 */
export function modifyUserNotificationSetting(
  params: components.ModifyUserNotificationSettingRequestParams,
  req: components.ModifyUserNotificationSettingRequest
) {
  return client.patch<null>(
    "/v1/users/:userId/settings/notifications",
    params,
    req
  );
}

/**
 * @description "Get notifications of servers user joined"
 * @param params
 */
export function getUserServersNotificationsSettings(
  params: components.GetUserServersNotificationsSettingsRequestParams
) {
  return client.get<components.GetUserServersNotificationsSettingsResponse>(
    "/v1/users/:userId/settings/notifications/servers",
    params
  );
}

/**
 * @description "Get single server setting of notifications"
 * @param params
 */
export function getSingleServerNotificationSetting(
  params: components.SingleServerNotificationSettingRequestParams
) {
  return client.get<components.UserServerNotificationSetting>(
    "/v1/users/:userId/settings/notifications/servers/:serverId",
    params
  );
}

/**
 * @description "Modify server setting of notifications"
 * @param params
 * @param req
 */
export function modifyServerNotificationSetting(
  params: components.ModifyServerNotificationSettingRequestParams,
  req: components.ModifyServerNotificationSettingRequest
) {
  return client.put<null>(
    "/v1/users/:userId/settings/notifications/servers/:serverId",
    params,
    req
  );
}

/**
 * @description "Get channels notification settings of server"
 * @param params
 */
export function getServerChannelsNotificationsSettings(
  params: components.GetServerChannelsNotificationsSettingsRequestParams
) {
  return client.get<components.GetServerChannelsNotificationsSettingsResponse>(
    "/v1/users/:userId/settings/notifications/servers/:serverId/channels",
    params
  );
}

/**
 * @description "Get channel setting of notifications"
 * @param params
 */
export function getChannelNotificationSetting(
  params: components.GetChannelNotificationSettingRequestParams
) {
  return client.get<components.UserServerChannelNotificationSetting>(
    "/v1/users/:userId/settings/notifications/channels/:channelId",
    params
  );
}

/**
 * @description "Modify channel setting of notifications"
 * @param params
 * @param req
 */
export function modifyChannelNotificationSetting(
  params: components.ModifyChannelNotificationSettingRequestParams,
  req: components.ModifyChannelNotificationSettingRequest
) {
  return client.put<null>(
    "/v1/users/:userId/settings/notifications/channels/:channelId",
    params,
    req
  );
}

/**
 * @description "Get user's following users"
 * @param params
 */
export function getUserFollowing(
  params: components.UserFollowingRequestParams
) {
  return client.get<components.UserFollowing>(
    "/v1/users/:userId/following",
    params
  );
}

/**
 * @description "Search user's following users"
 * @param params
 */
export function searchUserFollowing(
  params: components.SearchUserFollowingRequestParams
) {
  return client.get<components.UserFollowing>(
    "/v1/users/:userId/following/search",
    params
  );
}

/**
 * @description "Follow a user by id"
 * @param params
 * @param req
 */
export function followUserById(
  params: components.FollowUserByIdRequestParams,
  req: components.FollowUserByIdRequest
) {
  return client.post<components.FollowStatus>(
    "/v1/users/:userId/following/:followUserId",
    params,
    req
  );
}

/**
 * @description "Search user's basic info"
 * @param params
 */
export function searchUserBasicInfo(
  params: components.SearchUserBasicInfoRequestParams
) {
  return client.get<components.UserBasic>("/v1/users/search", params);
}

/**
 * @description "Unfollow a user"
 * @param params
 */
export function unfollowUser(params: components.UserUnfollowRequestParams) {
  return client.delete<components.FollowStatus>(
    "/v1/users/:userId/following/:unfollowUserId",
    params
  );
}

/**
 * @description "Get user's block users"
 * @param params
 */
export function getUserBlock(params: components.GetUserBlockRequestParams) {
  return client.get<components.UserBlockList>(
    "/v1/users/:userId/block",
    params
  );
}

/**
 * @description "Block a user"
 * @param params
 */
export function blockUser(params: components.BlockUserRequestParams) {
  return client.post<null>("/v1/users/:userId/block/:blockUserId", params);
}

/**
 * @description "Unblock a user"
 * @param params
 */
export function unblockUser(params: components.UnblockUserRequestParams) {
  return client.delete<null>("/v1/users/:userId/block/:unblockUserId", params);
}

/**
 * @description "Get user's joined servers"
 * @param params
 */
export function getUserServers(params: components.GetUserServersRequestParams) {
  return client.get<components.UserServerList>(
    "/v1/users/:userId/servers",
    params
  );
}

/**
 * @description "Get the intersection of the servers the user joined"
 * @param params
 */
export function getMutualServers(
  params: components.GetMutualServersRequestParams
) {
  return client.get<components.UserServerList>(
    "/v1/users/:userId/servers/mutual",
    params
  );
}

/**
 * @description "Get the difference set of the servers the user joined"
 * @param params
 */
export function getDifferentServers(
  params: components.GetDifferentServersRequestParams
) {
  return client.get<components.UserServerList>(
    "/v1/users/:userId/servers/different",
    params
  );
}

/**
 * @description "Join a server"
 * @param params
 * @param req
 */
export function joinServer(
  params: components.UserJoinServerRequestParams,
  req: components.UserJoinServerRequest
) {
  return client.post<components.UserJoinServerResponse>(
    "/v1/users/:userId/servers",
    params,
    req
  );
}

/**
 * @description "Leave a server"
 * @param params
 */
export function leaveServer(params: components.UserLeaveServerRequestParams) {
  return client.delete<null>("/v1/users/:userId/servers/:serverId", params);
}

/**
 * @description "Sign Out"
 */
export function signOut() {
  return client.post<null>("/v1/users/signout");
}

/**
 * @description "Check if the account can be deleted"
 */
export function checkDeleteUser() {
  return client.post<null>("/v1/users/delete/check");
}

/**
 * @description "Get the relationship between the requester and the target users"
 * @param req
 */
export function getUsersRelationship(
  req: components.GetUsersRelationshipRequest
) {
  return client.post<components.GetUsersRelationshipResponse>(
    "/v1/users/getrelationship",
    req
  );
}

/**
 * @description "Get user's info"
 * @param req
 */
export function getUserInfo(req: components.GetUserInfoRequest) {
  return client.post<components.GetUserInfoResponse>(
    "/v1/users/getuserinfo",
    req
  );
}

/**
 * @description "Get the authorized wallet signature message"
 * @param params
 */
export function getWalletAuthorizedNonce(
  params: components.GetWalletAuthorizedNonceRequestParams
) {
  return client.get<components.GetWalletAuthorizedNonceResponse>(
    "/v1/users/wallet/nonce/authorized",
    params
  );
}

/**
 * @description "Get servers"
 * @param params
 */
export function getServers(params: components.GetServersRequestParams) {
  return client.get<components.ServerList>("/v1/servers", params);
}

/**
 * @description "Search servers"
 * @param params
 */
export function searchServers(params: components.SearchServersRequestParams) {
  return client.get<components.ServerList>("/v1/servers/search", params);
}

/**
 * @description "Get server overview"
 * @param params
 */
export function getServerOverview(
  params: components.GetServerOverviewRequestParams
) {
  return client.get<components.ServerOverview>("/v1/servers/overview", params);
}

/**
 * @description "Create a server"
 * @param req
 */
export function createServer(req: components.CreateServerRequest) {
  return client.post<components.ServerBasic>("/v1/servers", req);
}

/**
 * @description "Get server info"
 * @param params
 */
export function getServerInfo(params: components.ServerIdRequestParams) {
  return client.get<components.ServerBasic>("/v1/servers/:serverId", params);
}

/**
 * @description "Get user's server setting"
 * @param params
 */
export function getServerSetting(
  params: components.GetServerSettingRequestParams
) {
  return client.get<components.ServerSetting>(
    "/v1/servers/:serverId/settings",
    params
  );
}

/**
 * @description "Modify user's server setting"
 * @param params
 * @param req
 */
export function modifyServerSetting(
  params: components.ModifyServerSettingRequestParams,
  req: components.ModifyServerSettingRequest
) {
  return client.patch<null>("/v1/servers/:serverId/settings", params, req);
}

/**
 * @description "Modify server position"
 * @param req
 */
export function modifyServerPosition(
  req: components.ModifyServerPositionRequest
) {
  return client.put<components.UserServerList>("/v1/servers/position", req);
}

/**
 * @description "Get server moderation settings"
 * @param params
 */
export function getServerModeration(params: components.ServerIdRequestParams) {
  return client.get<components.ServerModeration>(
    "/v1/servers/:serverId/settings/moderation",
    params
  );
}

/**
 * @description "Modify server moderation settings"
 * @param params
 * @param req
 */
export function modifyServerModeration(
  params: components.ModifyServerModerationRequestParams,
  req: components.ModifyServerModerationRequest
) {
  return client.patch<null>(
    "/v1/servers/:serverId/settings/moderation",
    params,
    req
  );
}

/**
 * @description "Get permission of server settings page"
 * @param params
 */
export function getPermissionOfServerSetting(
  params: components.GetPermissionOfServerSettingRequestParams
) {
  return client.get<components.PermissionOfServerSetting>(
    "/v1/servers/:serverId/permission",
    params
  );
}

/**
 * @description "Get permission of member settings page"
 * @param params
 */
export function getPermissionOfMemberSetting(
  params: components.GetPermissionOfMemberSettingRequestParams
) {
  return client.get<components.PermissionOfMemberSetting>(
    "/v1/servers/:serverId/members/permission",
    params
  );
}

/**
 * @description "Modify a server"
 * @param params
 * @param req
 */
export function modifyServer(
  params: components.ModifyServerRequestParams,
  req: components.ModifyServerRequest
) {
  return client.patch<null>("/v1/servers/:serverId", params, req);
}

/**
 * @description "Delete a server"
 * @param params
 */
export function deleteServer(params: components.ServerIdRequestParams) {
  return client.delete<null>("/v1/servers/:serverId", params);
}

/**
 * @description "Get server members"
 * @param params
 */
export function getServerMembers(
  params: components.GetServerMembersRequestParams
) {
  return client.get<components.ServerMemberList>(
    "/v1/servers/:serverId/members",
    params
  );
}

/**
 * @description "Get server member's profile"
 * @param params
 */
export function getServerMember(
  params: components.GetServerMemberRequestParams
) {
  return client.get<components.GetServerMemberResponse>(
    "/v1/servers/:serverId/members/:userId",
    params
  );
}

/**
 * @description "Search server members"
 * @param params
 */
export function searchServerMembers(
  params: components.SearchServerMembersRequestParams
) {
  return client.get<components.ServerMemberList>(
    "/v1/servers/:serverId/members/search",
    params
  );
}

/**
 * @description "Transfer server"
 * @param params
 * @param req
 */
export function transferServer(
  params: components.TransferServerRequestParams,
  req: components.TransferServerRequest
) {
  return client.post<null>("/v1/servers/:serverId/transfer", params, req);
}

/**
 * @description "Get server transfer members"
 * @param params
 */
export function getTransferMembers(
  params: components.GetTransferMembersRequestParams
) {
  return client.get<components.TransferMemberList>(
    "/v1/servers/:serverId/transfer/members",
    params
  );
}

/**
 * @description "Search server transfer members"
 * @param params
 */
export function searchTransferMembers(
  params: components.SearchTransferMembersRequestParams
) {
  return client.get<components.TransferMemberList>(
    "/v1/servers/:serverId/transfer/members/search",
    params
  );
}

/**
 * @description "Mute server member"
 * @param params
 * @param req
 */
export function muteServerMember(
  params: components.MuteServerMemberRequestParams,
  req: components.MuteServerMemberRequest
) {
  return client.post<null>(
    "/v1/servers/:serverId/members/mute/:userId",
    params,
    req
  );
}

/**
 * @description "Unmute server member"
 * @param params
 */
export function unmuteServerMember(
  params: components.UnmuteServerMemberRequestParams
) {
  return client.delete<null>(
    "/v1/servers/:serverId/members/mute/:userId",
    params
  );
}

/**
 * @description "Kick server member"
 * @param params
 */
export function kickServerMember(
  params: components.KickServerMemberRequestParams
) {
  return client.delete<null>("/v1/servers/:serverId/members/:userId", params);
}

/**
 * @description "Get a list of members blocked by the server"
 * @param params
 */
export function getServerBlockedMembers(
  params: components.GetServerBlockedMembersRequestParams
) {
  return client.get<components.ServerBlockedMemberList>(
    "/v1/servers/:serverId/members/block",
    params
  );
}

/**
 * @description "Search a list of members blocked by the server"
 * @param params
 */
export function searchServerBlockedMembers(
  params: components.SearchServerBlockedMembersRequestParams
) {
  return client.get<components.ServerBlockedMemberList>(
    "/v1/servers/:serverId/members/block/search",
    params
  );
}

/**
 * @description "Block server member"
 * @param params
 */
export function blockServerMember(
  params: components.BlockServerMemberRequestParams
) {
  return client.post<null>(
    "/v1/servers/:serverId/members/block/:blockUserId",
    params
  );
}

/**
 * @description "Unblock server member"
 * @param params
 */
export function unblockServerMember(
  params: components.UnblockServerMemberRequestParams
) {
  return client.delete<null>(
    "/v1/servers/:serverId/members/block/:unblockUserId",
    params
  );
}

/**
 * @description "Get invitation link for server"
 * @param params
 */
export function getServerLink(params: components.GetServerLinkRequestParams) {
  return client.get<components.ServerLink>(
    "/v1/servers/:serverId/link",
    params
  );
}

/**
 * @description "Get the list of server invitation members"
 * @param params
 */
export function getServerInviteMembers(
  params: components.GetServerInviteMembersRequestParams
) {
  return client.get<components.ServerInviteMemberList>(
    "/v1/servers/:serverId/invite/members",
    params
  );
}

/**
 * @description "Search the list of server invitation members"
 * @param params
 */
export function searchServerInviteMembers(
  params: components.SearchServerInviteMembersRequestParams
) {
  return client.get<components.ServerInviteMemberList>(
    "/v1/servers/:serverId/invite/members/search",
    params
  );
}

/**
 * @description "Create a channel in a server"
 * @param params
 * @param req
 */
export function createServerChannel(
  params: components.CreateChannelRequestParams,
  req: components.CreateChannelRequest
) {
  return client.post<components.CreateChannelResponse>(
    "/v1/servers/:serverId/channels",
    params,
    req
  );
}

/**
 * @description "Get list of channels in a server"
 * @param params
 */
export function getServerChannels(params: components.GetChannelsRequestParams) {
  return client.get<components.ServerChannels>(
    "/v1/servers/:serverId/channels",
    params
  );
}

/**
 * @description "Modify position of a channel of a server"
 * @param params
 * @param req
 */
export function modifyChannelPosition(
  params: components.ModifyChannelPositionRequestParams,
  req: components.ModifyChannelPositionRequest
) {
  return client.put<components.ModifyChannelPositionResponse>(
    "/v1/servers/:serverId/channels",
    params,
    req
  );
}

/**
 * @description "Get list of roles in a server"
 * @param params
 */
export function getServerRoles(params: components.GetServerRolesRequestParams) {
  return client.get<components.GetServerRolesResponse>(
    "/v1/servers/:serverId/roles",
    params
  );
}

/**
 * @description "Get overview of roles in a server"
 * @param params
 */
export function getServerRolesOverview(
  params: components.GetServerRolesOverviewRequestParams
) {
  return client.get<components.GetServerRolesOverviewResponse>(
    "/v1/servers/:serverId/roles/overview",
    params
  );
}

/**
 * @description "Get overview of visibility of roles in a server "
 * @param req
 */
export function getServerRolesVisibilityOverview(
  req: components.GetServerRolesVisibilityOverviewRequest
) {
  return client.get<components.GetServerRolesVisibilityOverviewResponse>(
    "/v1/servers/:serverId/roles/overview/visibility",
    req
  );
}

/**
 * @description "Get preset permissions by groups"
 * @param params
 */
export function getPermissions(params: components.GetPermissionsRequestParams) {
  return client.get<components.GetPermissionsResponse>(
    "/v1/servers/:serverId/roles/:roleId/permissions",
    params
  );
}

/**
 * @description "Create a role in a server"
 * @param params
 */
export function createServerRole(
  params: components.CreateServerRoleRequestParams
) {
  return client.post<components.CreateServerRoleResponse>(
    "/v1/servers/:serverId/roles",
    params
  );
}

/**
 * @description "Get a role in a server"
 * @param params
 */
export function getServerRole(params: components.GetServerRoleRequestParams) {
  return client.get<components.Role>(
    "/v1/servers/:serverId/roles/:roleId",
    params
  );
}

/**
 * @description "Modify a role in a server"
 * @param params
 * @param req
 */
export function modifyServerRole(
  params: components.ModifyServerRoleRequestParams,
  req: components.ModifyServerRoleRequest
) {
  return client.post<null>("/v1/servers/:serverId/roles/:roleId", params, req);
}

/**
 * @description "Delete a role in a server"
 * @param params
 */
export function deleteServerRole(
  params: components.DeleteServerRoleRequestParams
) {
  return client.delete<null>("/v1/servers/:serverId/roles/:roleId", params);
}

/**
 * @description "Get member of role"
 * @param params
 */
export function getServerRoleMembers(
  params: components.GetServerRoleMembersRequestParams
) {
  return client.get<components.GetServerRoleMembersResponse>(
    "/v1/servers/:serverId/roles/:roleId/members",
    params
  );
}

/**
 * @description "Search members of a role"
 * @param params
 */
export function searchServerRoleMembers(
  params: components.SearchServerRoleMembersRequestParams
) {
  return client.get<components.SearchServerRoleMembersResponse>(
    "/v1/servers/:serverId/roles/:roleId/members/search",
    params
  );
}

/**
 * @description "Add member to a role"
 * @param params
 * @param req
 */
export function createServerRoleMembers(
  params: components.CreateServerRoleMembersRequestParams,
  req: components.CreateServerRoleMembersRequest
) {
  return client.post<null>(
    "/v1/servers/:serverId/roles/:roleId/members",
    params,
    req
  );
}

/**
 * @description "Remove member from a role"
 * @param params
 * @param req
 */
export function deleteServerRoleMembers(
  params: components.DeleteServerRoleMembersRequestParams,
  req: components.DeleteServerRoleMembersRequest
) {
  return client.delete<null>(
    "/v1/servers/:serverId/roles/:roleId/members",
    params,
    req
  );
}

/**
 * @description "Modify positions of roles"
 * @param params
 * @param req
 */
export function modifyServerRolesPosition(
  params: components.ModifyServerRolePositionRequestParams,
  req: components.ModifyServerRolePositionRequest
) {
  return client.put<components.ModifyServerRolePositionResponse>(
    "/v1/servers/:serverId/roles",
    params,
    req
  );
}

/**
 * @description "Get rules of guards"
 * @param params
 */
export function getServerGuard(params: components.GetServerGuardRequestParams) {
  return client.get<components.GuardWithTokenName>(
    "/v1/servers/:serverId/guards/:roleId",
    params
  );
}

/**
 * @description "Create rule of guards"
 * @param params
 * @param req
 */
export function createServerGuard(
  params: components.CreateServerGuardRequestParams,
  req: components.CreateServerGuardRequest
) {
  return client.post<null>("/v1/servers/:serverId/guards", params, req);
}

/**
 * @description "Get overview of guards of server"
 * @param params
 */
export function getServerGuardsOverview(
  params: components.GetServerGuardsOverviewRequestParams
) {
  return client.get<components.GetServerGuardsOverviewResponse>(
    "/v1/servers/:serverId/guards/overview",
    params
  );
}

/**
 * @description "Modify rule of guards"
 * @param params
 * @param req
 */
export function modifyServerGuard(
  params: components.ModifyServerGuardRequestParams,
  req: components.ModifyServerGuardRequest
) {
  return client.put<null>("/v1/servers/:serverId/guards/:roleId", params, req);
}

/**
 * @description "Deletw rule of guards"
 * @param params
 */
export function deleteServerGuard(
  params: components.DeleteServerGuardRequestParams
) {
  return client.delete<null>("/v1/servers/:serverId/guards/:roleId", params);
}

/**
 * @description "Get tokens of guards"
 * @param params
 */
export function getServerGuardTokens(
  params: components.GetServerGuardTokensRequestParams
) {
  return client.get<components.ServerGuardTokens>(
    "/v1/servers/:serverId/guards/tokens",
    params
  );
}

/**
 * @description "Verify custom token"
 * @param req
 */
export function verifyCustomToken(req: components.VerifyCustomTokenRequest) {
  return client.post<components.VerifyCustomTokenResponse>(
    "/v1/servers/:serverId/guards/tokens/verify",
    req
  );
}

/**
 * @description "Get tokens of guards preset by official"
 * @param params
 */
export function getServerGuardTokensPreset(
  params: components.GetServerGuardTokensPresetRequestParams
) {
  return client.get<components.GetServerGuardTokensPresetResponse>(
    "/v1/servers/:serverId/guards/tokens/officials",
    params
  );
}

/**
 * @description "Search tokens by name/symbol/contract addresss"
 * @param params
 */
export function searchServerGuardTokens(
  params: components.SearchServerGuardTokensRequestParams
) {
  return client.get<components.SearchServerGuardTokensResponse>(
    "/v1/servers/:serverId/guards/tokens/search",
    params
  );
}

/**
 * @description "Create tokens of guards"
 * @param params
 * @param req
 */
export function createServerGuardToken(
  params: components.CreateServerGuardTokenRequestParams,
  req: components.CreateServerGuardTokenRequest
) {
  return client.post<components.GuardToken>(
    "/v1/servers/:serverId/guards/tokens",
    params,
    req
  );
}

/**
 * @description "Modify token of guards"
 * @param req
 */
export function modifyServerGuardToken(req: components.GuardToken) {
  return client.put<null>("/v1/servers/:serverId/guards/tokens/:tokenId", req);
}

/**
 * @description "Delete tokens of guards"
 * @param params
 */
export function deleteServerGuardToken(
  params: components.DeleteServerGuardTokenRequestParams
) {
  return client.delete<null>(
    "/v1/servers/:serverId/guards/tokens/:tokenId",
    params
  );
}

/**
 * @description "Get networks of tokens"
 * @param params
 */
export function getServerGuardTokenNetworks(
  params: components.GetServerGuardTokenNetworksParams
) {
  return client.get<components.ServerGuardTokenNetworks>(
    "/v1/servers/:serverId/guards/networks",
    params
  );
}

/**
 * @description "Get server's applications"
 * @param params
 */
export function getServerApplications(
  params: components.GetServerApplicationsRequestParams
) {
  return client.get<components.ApplicationList>(
    "/v1/servers/:serverId/applications",
    params
  );
}

/**
 * @description "Add applications for server"
 * @param params
 */
export function addServerApplications(
  params: components.AddServerApplicationsRequestParams
) {
  return client.post<null>(
    "/v1/servers/:serverId/applications/:applicationId",
    params
  );
}

/**
 * @description "Remove applications for server"
 * @param params
 */
export function removeServerApplications(
  params: components.RemoveServerApplicationsRequestParams
) {
  return client.delete<null>(
    "/v1/servers/:serverId/applications/:applicationId",
    params
  );
}

/**
 * @description "Get all servers's unread"
 */
export function getServersUnread() {
  return client.get<components.ServerUnreadList>("/v1/servers/unread");
}

/**
 * @description "Get the specified server's unread"
 * @param params
 */
export function getServerUnread(
  params: components.GetServerUnreadRequestParams
) {
  return client.get<components.ServerUnreadList>(
    "/v1/servers/:serverId/unread",
    params
  );
}

/**
 * @description "Get all applications"
 * @param params
 */
export function getApplications(
  params: components.GetApplicationsRequestParams
) {
  return client.get<components.ApplicationList>("/v1/applications", params);
}

/**
 * @description "Search applications"
 * @param params
 */
export function searchApplications(
  params: components.SearchApplicationsRequestParams
) {
  return client.get<components.ApplicationList>(
    "/v1/applications/search",
    params
  );
}

/**
 * @description "Get application info"
 * @param params
 */
export function getApplicationInfo(
  params: components.GetApplicationInfoRequestParams
) {
  return client.get<components.Application>(
    "/v1/applications/:applicationId",
    params
  );
}

/**
 * @description "Get search results of mentions"
 * @param params
 */
export function searchMentions(params: components.SearchMentionsRequestParams) {
  return client.get<components.SearchMentionsResponse>(
    "/v1/channels/:channelId/mentions",
    params
  );
}

/**
 * @description "Get roles of channel"
 * @param params
 */
export function getChannelRoles(
  params: components.GetChannelRolesRequestParams
) {
  return client.get<components.GetChannelRolesResponse>(
    "/v1/channels/:channelId/permissions",
    params
  );
}

/**
 * @description "Get overview of roles of channel"
 * @param params
 */
export function getChannelRolesOverview(
  params: components.GetChannelRolesOverviewRequestParams
) {
  return client.get<components.GetChannelRolesOverviewResponse>(
    "/v1/channels/:channelId/permissions/overview",
    params
  );
}

/**
 * @description "Search roles which can be metioned in channel"
 * @param params
 */
export function searchChannelRoles(
  params: components.SearchChannelRolesRequestParams
) {
  return client.get<components.SearchChannelRolesResponse>(
    "/v1/channels/:channelId/permissions/search",
    params
  );
}

/**
 * @description "Attach a role in a channel"
 * @param params
 */
export function createChannelRole(
  params: components.CreateChannelRoleRequestParams
) {
  return client.post<null>(
    "/v1/channels/:channelId/permissions/:roleId",
    params
  );
}

/**
 * @description "Modify a role in a channel"
 * @param params
 * @param req
 */
export function modifyChannelRole(
  params: components.ModifyChannelRoleRequestParams,
  req: components.ModifyChannelRoleRequest
) {
  return client.put<components.ModifyChannelRoleResponse>(
    "/v1/channels/:channelId/permissions/:roleId",
    params,
    req
  );
}

/**
 * @description "Delete a role in a channel"
 * @param params
 */
export function deleteChannelRole(
  params: components.DeleteChannelRoleRequestParams
) {
  return client.delete<null>(
    "/v1/channels/:channelId/permissions/:roleId",
    params
  );
}

/**
 * @description "Get detail of role override in a channel"
 * @param params
 */
export function getChannelRolePermission(
  params: components.GetChannelRolePermissionRequestParams
) {
  return client.get<components.GetChannelRolePermissionResponse>(
    "/v1/channels/:channelId/permissions/:roleId/permission",
    params
  );
}

/**
 * @description "Get members of roles in a channel"
 * @param params
 */
export function getChannelRolesMembers(
  params: components.GetChannelRolesMembersRequestParams
) {
  return client.get<components.GetChannelRolesMembersResponse>(
    "/v1/channels/:channelId/permissions/members",
    params
  );
}

/**
 * @description "Search members of roles in a channel"
 * @param params
 */
export function searchChannelMembers(
  params: components.SearchChannelMembersRequestParams
) {
  return client.get<components.SearchChannelMembersResponse>(
    "/v1/channels/:channelId/permissions/members/search",
    params
  );
}

/**
 * @description "Get channel"
 * @param params
 */
export function getChannel(params: components.GetChannelRequestParams) {
  return client.get<components.Channel>("/v1/channels/:channelId", params);
}

/**
 * @description "Modify channel"
 * @param params
 * @param req
 */
export function modifyChannel(
  params: components.ModifyChannelRequestParams,
  req: components.ModifyChannelRequest
) {
  return client.put<null>("/v1/channels/:channelId", params, req);
}

/**
 * @description "Delete channel"
 * @param params
 */
export function deleteChannel(params: components.DeleteChannelRequestParams) {
  return client.delete<null>("/v1/channels/:channelId", params);
}

/**
 * @description "Delete chat channel messages by admin"
 * @param params
 */
export function deleteChatMessage(
  params: components.DeleteChatMessageRequestParams
) {
  return client.delete<null>(
    "/v1/channels/:channelId/chat/messages/:messageId",
    params
  );
}

/**
 * @description "Get voice channel"
 * @param params
 */
export function getVoiceChannel(
  params: components.GetVoiceChannelRequestParams
) {
  return client.get<components.GetVoiceChannelResponse>(
    "/v1/channels/:channelId/voice",
    params
  );
}

/**
 * @description "Request speaking"
 * @param params
 */
export function speak(params: components.SpeakRequestParams) {
  return client.post<null>("/v1/channels/:channelId/voice/speak", params);
}

/**
 * @description "Get participant of voice channel"
 * @param params
 */
export function getVoiceChannelMembers(
  params: components.GetVoiceChannelMembersRequestParams
) {
  return client.get<components.GetVoiceChannelMembersResponse>(
    "/v1/channels/:channelId/voice/members",
    params
  );
}

/**
 * @description "Get participant from Agora userId"
 * @param params
 */
export function getVoiceChannelMembersAgora(
  params: components.GetVoiceChannelMembersAgoraRequestParams
) {
  return client.get<components.GetVoiceChannelMembersAgoraResponse>(
    "/v1/channels/:channelId/voice/members/agora",
    params
  );
}

/**
 * @description "Get member of voice channel"
 * @param params
 */
export function getVoiceChannelMember(
  params: components.GetVoiceChannelMemberRequestParams
) {
  return client.get<components.GetVoiceChannelMemberResponse>(
    "/v1/channels/:channelId/voice/members/:userId",
    params
  );
}

/**
 * @description "Get member of voice channel with Agora userId"
 * @param params
 */
export function getVoiceChannelMemberAgora(
  params: components.GetVoiceChannelMemberAgoraRequestParams
) {
  return client.get<components.GetVoiceChannelMemberResponse>(
    "/v1/channels/:channelId/voice/members/agora/:userId",
    params
  );
}

/**
 * @description "Join voice channel"
 * @param params
 */
export function joinVoiceChannel(
  params: components.JoinVoiceChannelRequestParams
) {
  return client.post<components.JoinVoiceChannelResponse>(
    "/v1/channels/:channelId/voice/members/:userId",
    params
  );
}

/**
 * @description "Leave voice channel"
 * @param params
 */
export function leaveVoiceChannel(
  params: components.LeaveVoiceChannelRequestParams
) {
  return client.delete<null>(
    "/v1/channels/:channelId/voice/members/:userId",
    params
  );
}

/**
 * @description "Modify states of user in voice channel"
 * @param params
 * @param req
 */
export function modifyVoiceChannelMember(
  params: components.ModifyVoiceChannelMemberRequestParams,
  req: components.ModifyVoiceChannelMemberRequest
) {
  return client.put<null>(
    "/v1/channels/:channelId/voice/members/:userId",
    params,
    req
  );
}

/**
 * @description "Post a announcement"
 * @param params
 * @param req
 */
export function createAnnouncement(
  params: components.CreateAnnouncementRequestParams,
  req: components.CreateAnnouncementRequest
) {
  return client.post<components.SimpleAnnouncement>(
    "/v1/channels/:channelId/announcements",
    params,
    req
  );
}

/**
 * @description "Get a announcement"
 * @param params
 */
export function getAnnouncement(
  params: components.GetAnnouncementRequestParams
) {
  return client.get<components.DetailAnnouncement>(
    "/v1/channels/:channelId/announcements/:announcementId",
    params
  );
}

/**
 * @description "Get announcement list of a channel"
 * @param params
 */
export function getAnnouncements(
  params: components.GetAnnouncementsRequestParams
) {
  return client.get<components.Announcements>(
    "/v1/channels/:channelId/announcements",
    params
  );
}

/**
 * @description "Pin a announcement "
 * @param params
 */
export function pinAnnouncement(
  params: components.PinAnnouncementRequestParams
) {
  return client.post<null>(
    "/v1/channels/:channelId/announcements/:announcementId/pin",
    params
  );
}

/**
 * @description "Get pinned announcement list of a channel"
 * @param params
 */
export function getPinnedAnnouncements(
  params: components.GetPinnedAnnouncementsRequestParams
) {
  return client.get<components.Announcements>(
    "/v1/channels/:channelId/announcements/pinned",
    params
  );
}

/**
 * @description "Unpin a announcement"
 * @param params
 */
export function unpinAnnouncement(
  params: components.UnpinAnnouncementRequestParams
) {
  return client.delete<null>(
    "/v1/channels/:channelId/announcements/:announcementId/unpin",
    params
  );
}

/**
 * @description "Get search announcement list of a channel"
 * @param params
 */
export function getSearchAnnouncements(
  params: components.GetSearchAnnouncementsRequestParams
) {
  return client.get<components.Announcements>(
    "/v1/channels/:channelId/announcements/search",
    params
  );
}

/**
 * @description "Modify a announcement"
 * @param params
 * @param req
 */
export function modifyAnnouncement(
  params: components.ModifyAnnouncementRequestParams,
  req: components.ModifyAnnouncementRequest
) {
  return client.put<null>(
    "/v1/channels/:channelId/announcements/:announcementId",
    params,
    req
  );
}

/**
 * @description "Delete a announcement"
 * @param params
 */
export function deleteAnnouncement(
  params: components.DeleteAnnouncementRequestParams
) {
  return client.delete<null>(
    "/v1/channels/:channelId/announcements/:announcementId",
    params
  );
}

/**
 * @description "Get announcement all emoji data list of a announcement"
 * @param params
 */
export function getAnnouncementEmojiDatas(
  params: components.GetAnnouncementEmojiDatasRequestParams
) {
  return client.get<components.AnnouncementEmojiDatas>(
    "/v1/channels/:channelId/announcements/:announcementId/emojidatas",
    params
  );
}

/**
 * @description "Post a announcement emoji reaction"
 * @param params
 * @param req
 */
export function createAnnouncementEmojiReactions(
  params: components.CreateAnnouncementEmojiReactionRequestParams,
  req: components.CreateAnnouncementEmojiReactionRequest
) {
  return client.post<null>(
    "/v1/channels/:channelId/announcement/:announcementId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Get announcement emoji reaction list of a emoji"
 * @param params
 * @param req
 */
export function getAnnouncementEmojiReactions(
  params: components.GetAnnouncementEmojiReactionsRequestParams,
  req: components.GetAnnouncementEmojiReactionsRequest
) {
  return client.get<components.AnnouncementEmojiReactions>(
    "/v1/channels/:channelId/announcements/:announcementId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Delete a announcement emoji reaction"
 * @param params
 * @param req
 */
export function deleteAnnouncementEmojiReactions(
  params: components.DeleteAnnouncementEmojiReactionRequestParams,
  req: components.DeleteAnnouncementEmojiReactionRequest
) {
  return client.delete<null>(
    "/v1/channels/:channelId/announcements/:announcementId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Post a forum topic"
 * @param params
 * @param req
 */
export function createTopic(
  params: components.CreateTopicRequestParams,
  req: components.CreateTopicRequest
) {
  return client.post<components.SimpleTopic>(
    "/v1/channels/:channelId/topics",
    params,
    req
  );
}

/**
 * @description "Get topic list of a channel"
 * @param params
 */
export function getTopics(params: components.GetTopicsRequestParams) {
  return client.get<components.SimpleTopics>(
    "/v1/channels/:channelId/topics",
    params
  );
}

/**
 * @description "Pin a topic "
 * @param params
 */
export function pinTopic(params: components.PinTopicRequestParams) {
  return client.post<null>(
    "/v1/channels/:channelId/topics/:topicId/pin",
    params
  );
}

/**
 * @description "Get pinned topic list of a channel"
 * @param params
 */
export function getPinnedTopics(
  params: components.GetPinnedTopicsRequestParams
) {
  return client.get<components.SimpleTopics>(
    "/v1/channels/:channelId/topics/pinned",
    params
  );
}

/**
 * @description "Unpin a topic"
 * @param params
 */
export function unpinTopic(params: components.UnpinTopicRequestParams) {
  return client.delete<null>(
    "/v1/channels/:channelId/topics/:topicId/unpin",
    params
  );
}

/**
 * @description "Get search topic list of a channel"
 * @param params
 */
export function getSearchTopics(
  params: components.GetSearchTopicsRequestParams
) {
  return client.get<components.SimpleTopics>(
    "/v1/channels/:channelId/topics/search",
    params
  );
}

/**
 * @description "Get topic detail "
 * @param params
 */
export function getTopic(params: components.GetTopicRequestParams) {
  return client.get<components.DetailTopic>(
    "/v1/channels/:channelId/topics/:topicId",
    params
  );
}

/**
 * @description "Modify a topic"
 * @param params
 * @param req
 */
export function modifyTopic(
  params: components.ModifyTopicRequestParams,
  req: components.ModifyTopicRequest
) {
  return client.put<null>(
    "/v1/channels/:channelId/topics/:topicId",
    params,
    req
  );
}

/**
 * @description "Delete a topic"
 * @param params
 */
export function deleteTopic(params: components.DeleteTopicRequestParams) {
  return client.delete<null>("/v1/channels/:channelId/topics/:topicId", params);
}

/**
 * @description "Get topic emoji data list of a topic"
 * @param params
 */
export function getTopicEmojiDatas(
  params: components.GetTopicsEmojiDatasRequestParams
) {
  return client.get<components.TopicEmojiDatas>(
    "/v1/channels/:channelId/topics/:topicId/emojidatas",
    params
  );
}

/**
 * @description "Post a topic emoji reaction"
 * @param params
 * @param req
 */
export function createTopicEmojiReactions(
  params: components.CreateTopicEmojiReactionRequestParams,
  req: components.CreateTopicEmojiReactionRequest
) {
  return client.post<null>(
    "/v1/channels/:channelId/topics/:topicId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Get topic emoji reaction list of a emoji"
 * @param params
 * @param req
 */
export function getTopicEmojiReactions(
  params: components.GetTopicEmojiReactionsRequestParams,
  req: components.GetTopicEmojiReactionsRequest
) {
  return client.get<components.TopicEmojiReactions>(
    "/v1/channels/:channelId/topics/:topicId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Delete a topic emoji reaction"
 * @param params
 * @param req
 */
export function deleteTopicEmojiReactions(
  params: components.DeleteTopicEmojiReactionRequestParams,
  req: components.DeleteTopicEmojiReactionRequest
) {
  return client.delete<null>(
    "/v1/channels/:channelId/topics/:topicId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Post a forum topic reply"
 * @param params
 * @param req
 */
export function createTopicReply(
  params: components.CreateTopicReplyRequestParams,
  req: components.CreateTopicReplyRequest
) {
  return client.post<components.TopicReply>(
    "/v1/channels/:channelId/topics/:topicId/replies",
    params,
    req
  );
}

/**
 * @description "Modify a topic reply"
 * @param params
 * @param req
 */
export function modifyTopicReply(
  params: components.ModifyTopicReplyRequestParams,
  req: components.ModifyTopicReplyRequest
) {
  return client.put<null>(
    "/v1/channels/:channelId/topics/:topicId/replies/:replyId",
    params,
    req
  );
}

/**
 * @description "Get reply list of a topic"
 * @param params
 */
export function getTopicReplies(
  params: components.GetTopicRepliesRequestParams
) {
  return client.get<components.TopicReplies>(
    "/v1/channels/:channelId/topics/:topicId/replies",
    params
  );
}

/**
 * @description "Delete a reply"
 * @param params
 */
export function deleteTopicReply(
  params: components.DeleteTopicReplyRequestParams
) {
  return client.delete<null>(
    "/v1/channels/:channelId/topics/:topicId/replies/:replyId",
    params
  );
}

/**
 * @description "Get reply emoji data list of a Topic reply"
 * @param params
 */
export function getTopicReplyEmojiDatas(
  params: components.GetTopicRepliesEmojiDatasRequestParams
) {
  return client.get<components.TopicReplyEmojiDatas>(
    "/v1/channels/:channelId/topics/:topicId/replies/:replyId/emojidatas",
    params
  );
}

/**
 * @description "Post a reply emoji reaction"
 * @param params
 * @param req
 */
export function createTopicReplyEmojiReactions(
  params: components.CreateTopicReplyEmojiReactionRequestParams,
  req: components.CreateTopicReplyEmojiReactionRequest
) {
  return client.post<null>(
    "/v1/channels/:channelId/topics/:topicId/replies/:replyId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Get reply emoji reaction list of a emoji"
 * @param params
 * @param req
 */
export function getTopicReplyEmojiReactions(
  params: components.GetTopicReplyEmojiReactionsRequestParams,
  req: components.GetTopicReplyEmojiReactionsRequest
) {
  return client.get<components.TopicReplyEmojiReactions>(
    "/v1/channels/:channelId/topics/:topicId/replies/:replyId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Delete a reply emoji reaction"
 * @param params
 * @param req
 */
export function deleteTopicReplyEmojiReactions(
  params: components.DeleteTopicReplyEmojiReactionRequestParams,
  req: components.DeleteTopicReplyEmojiReactionRequest
) {
  return client.delete<null>(
    "/v1/channels/:channelId/topics/:topicId/replies/:replyId/emojireactions",
    params,
    req
  );
}

/**
 * @description "Get application's url"
 * @param params
 */
export function getApplicationUrl(
  params: components.GetApplicationUrlRequestParams
) {
  return client.get<components.GetApplicationUrlResponse>(
    "/v1/channels/:channelId/applications/url",
    params
  );
}

/**
 * @description "Get report reasons"
 */
export function getReportReasons() {
  return client.get<components.GetReportReasonsResponse>("/v1/reports/reasons");
}

/**
 * @description "Submit report"
 * @param req
 */
export function submitReport(req: components.SubmitReportRequest) {
  return client.post<null>("/v1/reports", req);
}

/**
 * @description "Request new uploads"
 * @param req
 */
export function createObjectUploads(req: components.CreateUploadsRequest) {
  return client.post<components.CreateUploadsResponse>("/v1/uploads", req);
}

/**
 * @description "Request new multipart upload"
 * @param req
 */
export function createMultipartUpload(
  req: components.CreateMultipartUploadRequest
) {
  return client.post<components.CreateMultipartUploadResponse>(
    "/v1/uploads/multipart",
    req
  );
}

/**
 * @description "Complete multipart uploads"
 * @param params
 */
export function completeMultipartUpload(
  params: components.CompleteMultipartUploadRequestParams
) {
  return client.post<null>("/v1/uploads/multipart/:uploadId", params);
}

/**
 * @description "Abort multipart upload"
 * @param params
 */
export function abortMultipartUpload(
  params: components.AbortMultipartUploadRequestParams
) {
  return client.delete<null>("/v1/uploads/multipart/:uploadId", params);
}

/**
 * @description "Send a server invite"
 * @param params
 */
export function getServerInviteMessage(
  params: components.GetServerInviteMessageRequestParams
) {
  return client.get<components.GetServerInviteMessageResponse>(
    "/v1/customs/servers/invite",
    params
  );
}

/**
 * @description "Send a user contact"
 * @param params
 */
export function getUserContactMessage(
  params: components.GetUserContactMessageRequestParams
) {
  return client.get<components.GetUserContactMessageResponse>(
    "/v1/customs/users/contact",
    params
  );
}

/**
 * @description "Send a voice invite"
 * @param params
 */
export function getVoiceInviteMessage(
  params: components.GetVoiceInviteMessageRequestParams
) {
  return client.get<components.GetVoiceInviteMessageResponse>(
    "/v1/customs/channels/invite",
    params
  );
}

/**
 * @description "Notification of being followed"
 * @param params
 */
export function getBeingFollowedMessage(
  params: components.GetBeingFollowedMessageRequestParams
) {
  return client.get<components.GetBeingFollowedMessageResponse>(
    "/v1/customs/users/followed",
    params
  );
}

/**
 * @description "Notification of transferred"
 * @param params
 */
export function getServerTransferredMessage(
  params: components.GetServerTransferredMessageRequestParams
) {
  return client.get<components.GetServerTransferredMessageResponse>(
    "/v1/customs/servers/transferred",
    params
  );
}

/**
 * @description "Get plugin login message"
 * @param params
 */
export function getLoginMessage(
  params: components.GetLoginMessageRequestParams
) {
  return client.get<components.GetLoginMessageResponse>(
    "/v1/plugins/login",
    params
  );
}

/**
 * @description "get guage claim reward"
 * @param req
 */
export function getReward(req: components.GetRewardRequest) {
  return client.post<components.GetRewardResponse>("/v1/booster/reward", req);
}

/**
 * @description "Get mention notifications"
 * @param params
 */
export function getMentionNotifications(
  params: components.GetMentionNotificationsRequestParams
) {
  return client.get<components.GetMentionNotificationsResponse>(
    "/v1/notifications/mention",
    params
  );
}

/**
 * @description "Delete one mention notification"
 * @param params
 */
export function deleteMentionNotification(
  params: components.DeleteMentionNotificationRequestParams
) {
  return client.delete<null>(
    "/v1/notifications/mention/:notificationId",
    params
  );
}

/**
 * @description "Get aggregate mention notifications"
 * @param params
 */
export function getAggregateMentions(
  params: components.GetAggregateMentionsRequestParams
) {
  return client.get<components.GetAggregateMentionsResponse>(
    "/v1/notifications/mention/aggregation",
    params
  );
}

/**
 * @description "Delete one aggregate mention notification"
 * @param params
 */
export function deleteAggregateMention(
  params: components.DeleteAggregateMentionRequestParams
) {
  return client.delete<null>(
    "/v1/notifications/mention/aggregation/:notificationId",
    params
  );
}

/**
 * @description "Get system notifications"
 * @param params
 */
export function getSystemNotifications(
  params: components.GetSystemNotificationsRequestParams
) {
  return client.get<components.GetSystemNotificationsResponse>(
    "/v1/notifications/system",
    params
  );
}
