using inventario_api.DTOs;
using inventario_api.Models;

namespace inventario_api.Interfaces
{
    public interface ICategoriaServices
    {
        public Task<IEnumerable<CategoriaDTO>> GetAllCategorias();

        public Task<bool> SaveCategoriaAsync(CategoriaDTO requestCategoria);

        public Task<bool> UpdateCategoriaAsync(CategoriaDTO requestCategoria);

        public Task<bool> DeleteCategoriaAsync(int requestID);
    }
}