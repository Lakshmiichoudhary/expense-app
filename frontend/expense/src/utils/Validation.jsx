const Validation = (email,password,confirmpassWord) => {
    if(!email || !password )
    return "all fields are required"
    
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const isPassword = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/.test(password)

    if(!isEmail) 
    return "Enter valid Email"

    if(!isPassword)
    return "Require Minimum eight characters,at least one uppercase letter, lowercase letter and one number and one special character"
    
    if(confirmpassWord && password !== confirmpassWord)
        return "Password do not match"

    return null
}

export default Validation