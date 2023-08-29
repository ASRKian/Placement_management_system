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
        const forms = await UserForm.find({}, {__v: 0})
        return res.status(200).json(forms)
    } catch (error) {
        return res.status(500).send({ 'message': error.message })
    }
}