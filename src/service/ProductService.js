import axios from "axios"

class ProductService {
    getProductOfShop(shopId) {
        return axios.get('http://localhost:8088/product/getByIdShop/'+shopId)
    }

    saveProduct(product) {
        return axios.post('http://localhost:8088/product/save', product);
    }

    updateProduct(product) {
        return axios.put('http://localhost:8088/product/update', product)
    }

    deleteProduct(id) {
        return axios.delete('http://localhost:8088/product/delete/'+id+'/1')
    }

    searchProduct(keyword) {
        return axios.get('http://localhost:8088/product/searchProductByKeyword?keyword=' + keyword)

    }
}

export default new ProductService()