interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Family Owner'],
  customerRoles: ['Guest User'],
  tenantRoles: ['Family Owner', 'Family Member', 'Admin', 'Viewer'],
  tenantName: 'Family',
  applicationName: 'familydry2',
  addOns: [],
};
