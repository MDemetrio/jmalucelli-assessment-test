const url = "https://mdemetrio-functions.azurewebsites.net/api/quote"

export function getQuoteByCnpj(cnpj) {
    const token = JSON.parse(localStorage.getItem('ACCESS-TOKEN'));

    const headers = token ? new Headers({ 'access-token': token }) : new Headers();

    return fetch(`${url}/${cnpj}`, {
        method: 'GET',
        headers
    });
}