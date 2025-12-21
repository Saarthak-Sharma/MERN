const validate = (schema) => async(req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) { 
        const status = 422;
        const message = "Fill The Input Properly";
        const extraDetails = err.errors ?
                             err.errors.map(e => e.message):
                             err.issues ? err.issues.map(e => e.message): [];
        
        console.log(err);
        // res.status(400).json({msg: message });

        const error = {
            status,
            message,
            extraDetails,
        }

        console.log(error);
        next(error);
    }
};

module.exports = validate;