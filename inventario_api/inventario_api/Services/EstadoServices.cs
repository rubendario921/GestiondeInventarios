using inventario_api.DTOs;
using inventario_api.Interfaces;
using inventario_api.Models;
using Microsoft.EntityFrameworkCore;

namespace inventario_api.Services
{
    public class EstadoServices : IEstadoServices
    {
        private readonly InventarioBDDContext dbContext;
        private readonly ILogServices logServices;
        private readonly IConfiguration configuration;

        public EstadoServices(InventarioBDDContext dbContext, ILogServices logServices, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.logServices = logServices;
            this.configuration = configuration;
        }

        public async Task<IEnumerable<EstadoDTO>> GetAllEstados()
        {
            try
            {
                var result = await dbContext.Estados.Select(e => new EstadoDTO
                {
                    est_id = e.est_id,
                    est_name = e.est_name,
                    est_details = e.est_details,
                    est_color = e.est_color,
                }).ToListAsync();

                if (result == null) return Enumerable.Empty<EstadoDTO>();
                return result;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(GetAllEstados),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> SaveEstadoAsync(EstadoDTO requestEstado)
        {
            //Validacion
            if (requestEstado == null) throw new ArgumentNullException(nameof(requestEstado), $"Erro los campos estan nulos o vacios");

            //Proceso
            try
            {
                Estado newEstado = new()
                {
                    est_id = requestEstado.est_id,
                    est_name = requestEstado.est_name,
                    est_color = requestEstado.est_color,
                    est_details = requestEstado.est_details,
                };

                await dbContext.Estados.AddAsync(newEstado);
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;
                return result;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(SaveEstadoAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> UpdateEstadoAsync(EstadoDTO requestEstado)
        {
            //Validacion
            if (requestEstado == null) throw new ArgumentNullException(nameof(requestEstado), $"Error los campos estan nulos o vacios");

            //Proceso
            try
            {
                var dataEstado = await dbContext.Estados.FirstAsync(x => x.est_id.Equals(requestEstado.est_id));
                if (dataEstado == null) throw new KeyNotFoundException($"Error: La estado no existe");

                dataEstado.est_name = requestEstado.est_name;
                dataEstado.est_details = requestEstado.est_details;
                dataEstado.est_color = requestEstado.est_color;

                dbContext.Entry(dataEstado).State = EntityState.Modified;
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;

                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(UpdateEstadoAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> DeleteEstadosAsync(int requestID)
        {
            //Validacion
            if (requestID <= 0l) throw new InvalidOperationException($"Error: Los campos se encuentran nulos o vacios");

            try
            {
                var dataEstado = await dbContext.Estados.FirstAsync(x => x.est_id.Equals(requestID));
                if (dataEstado == null) throw new KeyNotFoundException($"Error: El estado no existe");

                dbContext.Estados.Remove(dataEstado);
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;
                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(UpdateEstadoAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }
    }
}