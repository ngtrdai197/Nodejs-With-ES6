let products = [];

export const productController = {
    findAll(req, res, next) {
        return res.status(200).send(products);
    },
    async created(req, res, next) {
        await products.unshift(req.body);
        return res.status(200).send(req.body);
    }
}