//Available at https://mdemetrio-functions.azurewebsites.net/api/quote/:cnpj

module.exports = async function (context, req) {
    context.log(req.headers.authorization)
    if (!req.headers['access-token']) {
        context.res = {
            status: 401,
            body: "Não autorizado"
        };
    } else {
        //just cnpj: 12345678000123 returns OK
        if (req.params.cnpj && req.params.cnpj === '12345678000123') {
            context.res = {
                body: "Empresa encontrada"
            };
        }
        else {
            context.res = {
                status: 404,
                body: "Empresa não encontrada"
            };
        }
    }
};