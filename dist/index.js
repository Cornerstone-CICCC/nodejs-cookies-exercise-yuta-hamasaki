"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// // middleware
// const cookie = process.env.COOKIE_KEY
// app.use(cookieParser(cookie))
// // Routes
app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my homepage</h1>  <a href="/login">ログイン</a><a href="/profile">プロフィール</a>');
});
app.get('/login', (req, res) => {
    res.status(200).send('<h1>login</h1>');
});
// app.post('/login', (req: Request, res: Response) => {
//   res.status(200).send('<h1>login</h1>')
// })
app.get('/profile', (req, res) => {
    res.status(200).send('<h1>profile</h1>');
});
// app.get('/login', (req: Request, res:Response)=>{
//   res.cookie('authToken', "abc123",{
//     maxAge: 60 * 1000, //1分 ミリセカンド
//     //maxAge はcookieの持続時間のこと
//     httpOnly: true,
//     // Express の httpOnly は、Cookie がクライアントの JavaScript ではなく HTTP(S) のみを介して送信されるように設定する属性です。これにより、クロスサイト・スクリプティング（XSS）攻撃から保護することができます。
//     signed: true, //signed req.signedCookies, not req. req.cookies that is signed 
//   })
// res.status(200).send('Cookie set!')
// })
// app.get('/private', (req: Request, res:Response)=>{
//   const {authToken}= req.signedCookies
//   if(authToken === "abc123"){
//     res.status(200).send('Access granted')
//   }else{
//     res.redirect("/")
//   }
// })
// app.get('/logout', (req: Request, res:Response)=>{
//   res.clearCookie("authToken")
//   res.status(200).send('cookie cleard')
// })
// Start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
