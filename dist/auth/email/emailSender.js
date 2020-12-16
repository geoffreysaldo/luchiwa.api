"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'luchiwalaseyne@gmail.com',
        clientId: "273627788980-6i3n4k1a3hoa3rpbiojvm8j5q0rhgcuu.apps.googleusercontent.com",
        clientSecret: "bhUi8dSLfh3NF63abl-ngBxj",
        refreshToken: "1//04swMiZ7BK8-UCgYIARAAGAQSNwF-L9Irmq-MoK-Gui-RpE9jmmoT7M0C4QR0sr5qZPb-OIuAmezcK21lfGRra1rtZzwGbUWHPwo",
    }
});
//# sourceMappingURL=emailSender.js.map