const xlsx = require('xlsx');
const Income = require("../models/Income");
const { Types } = require("mongoose");


//Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon,source, amount, date} = req.body;

        //Validation: Check for missing fields 
        if(!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required"});
        }
        const newIncome =  new Income({
             userId,
             icon,
             source,
             amount: Number(amount),
             date: date ? new Date(date) : new Date(),
           
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

//Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

//Delete Income Source
    exports.deleteIncome = async (req, res) =>{
        try {
            await Income.findByIdAndDelete(req.params.id);
            res.json({message: "Income deleted succesfully"});
        } catch (error) {
            res.status(500).json({message: "Server Error"});
        }
    };


// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // formatted date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Set headers for download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Write workbook directly to response
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
    res.send(buffer);
  } catch (error) {
    console.error("Error generating income Excel:", error);
    res.status(500).json({ message: "Server Error" });
  }
};