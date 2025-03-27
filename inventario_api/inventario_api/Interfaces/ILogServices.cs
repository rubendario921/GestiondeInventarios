using inventario_api.DTOs;

namespace inventario_api.Interfaces
{
    public interface ILogServices
    {
        public Task<bool> RegisterLogAsync(MsgLog msgLog);
    }
}