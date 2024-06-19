import userService from './src/services/user.service.js';
const excute = async () => {
    const users = await userService.login();
    console.log(users);
}
excute();