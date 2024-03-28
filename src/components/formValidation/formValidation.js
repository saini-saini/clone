import * as Yup from 'yup'
const contactNo = (value) => /^\d+$/.test(value)


export const SignupValidation = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required"),
    number: Yup.string().required('Number is required').test('Numbers only', "Please enter numbers only", contactNo).min(10, 'please enter valid number').max(10, 'Maximum number limits'),
    username: Yup.string().required("Username is required"),

})

export const LoginValidation = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
})


export const ProfileValidation = Yup.object({
    email: Yup.string().email().required("Email is required"),
    number: Yup.string().required('Number is required').test('Numbers only', "Please enter numbers only", contactNo).min(10, 'please enter valid number').max(10, 'Maximum number limits'),
    username: Yup.string().required("Username is required"),

})