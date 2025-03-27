using inventario_api.DTOs;

namespace inventario_api.Interfaces
{
    public interface IProductoServices
    {
        public Task<IEnumerable<ProductoDTO>> GetAllProductos();
        public Task<bool> SaveProductoAsync(ProductoDTO requestProducto);
        public Task<bool> UpdateProductoAsync(ProductoDTO requestProducto);
        public Task<bool> DeleteProductoAsync(ProductoDTO requestProducto);
    }
}
