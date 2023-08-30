import transporter from "../Config/emailConfig.js"
import UserForm from "../Model/FormSchema.js"

export const newForm = async (req, res) => {
    try {
        const form = new UserForm(req.body)
        await form.save()
        return res.status(200).json({ 'message': 'Form submitted successfully' })
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

export const getAllForms = async (req, res) => {
    try {
        const forms = await UserForm.find({}, { __v: 0 })
        return res.status(200).json(forms)
    } catch (error) {
        return res.status(500).send({ 'message': error.message })
    }
}

export const sendEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Selection regarding",
            html: `<p>Congratulations... you've been selected</p>`
        })
        res.status(200).send({ "status": "success", "message": "Email has been sent to the candidate." })
    }
    else {
        res.status(400).send({ "status": "failed", "message": "Email not found" })
    }
}

export const setSelection = async (req, res) => {
    const { id } = req.body
    if (id) {
        try {
            await UserForm.findByIdAndUpdate(id, { $set: { selected: true } })
            res.status(200).send({ "status": "success", "message": "form updated successfully" })
        } catch (error) {
            console.log(error);
            res.status(400).send({ "status": "failed", "message": error.message })
        }
    } else {
        res.status(400).send({ "status": "failed", "message": "Id not found" })
    }
}

export const deleteForm = async (req, res) => {
    const { id } = req.body
    if (id) {
        try {
            await UserForm.findByIdAndDelete(id)
            res.status(200).send({ "status": "success", "message": "form deleted successfully" })
        } catch (error) {
            console.log(error);
            res.status(400).send({ "status": "failed", "message": error.message })
        }
    } else {
        res.status(400).send({ "status": "failed", "message": "Id not found" })
    }
}