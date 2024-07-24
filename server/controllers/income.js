import Income from "../models/IncomeModel.js";

export const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    console.log('Request Body:', req.body); // Debugging line

    const parsedAmount = parseFloat(amount); // Ensure the amount is a number

    const income = new Income({
        title,
        amount: parsedAmount,
        category,
        description,
        date
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log('Income:', income); // Debugging line
};

export const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
