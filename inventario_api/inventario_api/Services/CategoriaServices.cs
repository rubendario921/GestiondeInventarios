using inventario_api.DTOs;
using inventario_api.Interfaces;
using inventario_api.Models;
using Microsoft.EntityFrameworkCore;

namespace inventario_api.Services
{
    public class CategoriaServices : ICategoriaServices
    {
        private readonly InventarioBDDContext dbContext;
        private readonly ILogServices logServices;
        private readonly IConfiguration configuration;

        public CategoriaServices(InventarioBDDContext dbContext, IConfiguration configuration, ILogServices logServices)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
            this.logServices = logServices;
        }

        public async Task<IEnumerable<CategoriaDTO>> GetAllCategorias()
        {
            try
            {
                var result = await dbContext.Categorias.Select(x => new CategoriaDTO
                {
                    cat_id = x.cat_id,
                    cat_name = x.cat_name,
                    cat_details = x.cat_details,
                    cat_group = x.cat_group
                }).ToListAsync();

                if (result == null) return Enumerable.Empty<CategoriaDTO>();

                return result;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(GetAllCategorias),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> SaveCategoriaAsync(CategoriaDTO requestCategoria)
        {
            //Validacion
            if (requestCategoria == null) throw new ArgumentNullException(nameof(requestCategoria), $"Error los campos estan nulos o vacios");

            //Proceso
            try
            {
                Categoria newCategoria = new()
                {
                    cat_name = requestCategoria.cat_name,
                    cat_details = requestCategoria.cat_details,
                    cat_group = requestCategoria.cat_group
                };

                await dbContext.Categorias.AddAsync(newCategoria);
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;
                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(SaveCategoriaAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> UpdateCategoriaAsync(CategoriaDTO requestCategoria)
        {
            //Validacion
            if (requestCategoria == null) throw new ArgumentNullException(nameof(requestCategoria), $"Error los campos estan nulos o vacios");

            //Proceso
            try
            {
                var dataCategories = await dbContext.Categorias.FirstAsync(x => x.cat_id.Equals(requestCategoria.cat_id));
                if (dataCategories == null) throw new KeyNotFoundException($"Error: La categoria no existe");

                dataCategories.cat_name = requestCategoria.cat_name;
                dataCategories.cat_details = requestCategoria.cat_details;
                dataCategories.cat_group = requestCategoria.cat_group;

                dbContext.Entry(dataCategories).State = EntityState.Modified;
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;

                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(UpdateCategoriaAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> DeleteCategoriaAsync(int requestID)
        {
            //Validacion
            if (requestID <= 0) throw new InvalidOperationException($"Error: los campos estan nulos vacios");

            //Proceso
            try
            {
                var dataCategories = await dbContext.Categorias.FirstAsync(x => x.cat_id.Equals(requestID));
                if (dataCategories == null) throw new KeyNotFoundException($"Error: La categoria no existe");
                dbContext.Categorias.Remove(dataCategories);
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;
                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(DeleteCategoriaAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }
    }
}