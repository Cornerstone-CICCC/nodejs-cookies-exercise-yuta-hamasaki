"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// In-memory database
const users = [
    { username: 'admin', password: '12345' }
];
// Middleware
app.use((0, cookie_parser_1.default)(process.env.COOKIE_KEY));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/views'));
// // Routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/login', (req, res) => {
    res.render("login");
});
app.post('/login', (req, res) => {
    const found = users.find(user => user.username === req.body.username && user.password === req.body.password);
    if (found) {
        res.cookie('authToken', 'authenticated', {
            maxAge: 2 * 60 * 1000,
            httpOnly: true,
            signed: true
        });
        res.redirect('/profile');
    }
    else {
        res.send('User not found');
    }
});
app.get('/profile', auth_1.checkAuth, (req, res) => {
    res.status(200).send('<h1>profile</h1>');
});
app.use((req, res) => {
    res.status(404).send('Page not found');
});
// Start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
