const Sib = require("sib-api-v3-sdk")

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

const tranEmail = new Sib.TransactionalEmailsApi()

const sender = {
    email : 'laxmi@gmail.com'
}

const receivers = [
    {
    email : 'laxmi2252001@gmail.com'
    }
]

tranEmail.sendTransacEmail({
    sender,
    to: receivers,
    subject : 'forget password',
    textContent : 'hjhj'
}).catch(console.log)