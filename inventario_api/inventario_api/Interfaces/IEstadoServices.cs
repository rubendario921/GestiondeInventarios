using inventario_api.DTOs;

namespace inventario_api.Interfaces
{
    public interface IEstadoServices
    {
        public Task<IEnumerable<EstadoDTO>> GetAllEstados();

        public Task<bool> SaveEstadoAsync(EstadoDTO requestEstado);

        public Task<bool> UpdateEstadoAsync(EstadoDTO requestEstado);

        public Task<bool> DeleteEstadosAsync(int requestID);
    }
}