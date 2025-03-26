import { AccountManagementService } from "../../services/accountManagementService/accountManagement.service";
const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ? `${process.env.SALES_SERVICE_BASE_URL}`
  : "http://localhost:3003";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}
const accountManagementService = new AccountManagementService();

export const UsersService = {
  /**
   * Creates a user and a helper account.
   * @param {CreateUserInput} dataUser - The data for creating the user.
   * @param {CreateHelperInput} dataHelper - The data for creating the helper.
   * @returns {Promise<Object|null>} The created user and helper objects, or null if an error occurs.
   */
  createUserandHelper: async (
    dataUser: UserData,
    dataHelper: UserData
  ): Promise<object | null> => {
    try {
      const user = await accountManagementService.createUser(dataUser);

      const helper = await accountManagementService.createHelper(dataHelper);

      await accountManagementService.addHelperToUser(
        String(user.id),
        String(helper.id)
      );

      return { user, helper };
    } catch (e) {
      console.error("Error creating user and helper:", e);
      return null;
    }
  },
};
