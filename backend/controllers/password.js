const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const ForgotPassword = require("../models/forgetPassword");

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

console.log('API Key:', process.env.API_KEY);

const tranEmail = new Sib.TransactionalEmailsApi();

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const id = uuidv4();
        await ForgotPassword.create({ id, userId: user.id });

        const resetUrl = `http://localhost:3000/password/resetpassword/${id}`;

        await tranEmail.sendTransacEmail({
            sender: { email: 'laxmi@gmail.com' },
            to: [{ email }],
            subject: 'Password Reset',
            textContent: `Reset your password using the following link: ${resetUrl}`
        });

        console.log('Password reset email sent');
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error in forgetPassword:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await ForgotPassword.findOne({ where: { id, isActive: true } });

        if (!request) {
            return res.status(400).json({ error: 'Invalid or expired reset link' });
        }

        res.status(200).json({ message: 'Valid reset link', id });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
        const request = await ForgotPassword.findOne({ where: { id, isActive: true } });

        if (!request) {
            return res.status(400).json({ error: 'Invalid or expired reset link' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.update(
            { password: hashedPassword },
            { where: { id: request.userId } }
        );

        await ForgotPassword.update(
            { isActive: false },
            { where: { id } }
        );

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error in updatePassword:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
