using inventario_api.DTOs;
using inventario_api.Interfaces;
using inventario_api.Models;
using Microsoft.EntityFrameworkCore;

namespace inventario_api.Services
{
    public class ProductoServices : IProductoServices
    {
        private readonly InventarioBDDContext dbContext;
        private readonly ILogServices logServices;
        private readonly IConfiguration configuration;

        public ProductoServices(InventarioBDDContext dbContext, ILogServices logServices, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.logServices = logServices;
            this.configuration = configuration;
        }

        public async Task<IEnumerable<ProductoDTO>> GetAllProductos()
        {
            try
            {
                var result = await dbContext.Productos.Select(p => new ProductoDTO
                {
                    prod_id = p.prod_id,
                    prod_name = p.prod_name,
                    prod_details = p.prod_details,
                    prod_price = p.prod_price,
                    prod_stock = p.prod_stock,
                    prod_image = p.prod_image,
                    cat_id = p.cat_id,
                    est_id = p.est_id,
                }).ToListAsync();
                if (result == null) return Enumerable.Empty<ProductoDTO>();

                return result;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(GetAllProductos),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> SaveProductoAsync(ProductoDTO requestProducto)
        {
            //Validacion
            if (requestProducto == null) throw new ArgumentNullException(nameof(requestProducto), $"Error los campos estan nulos o vacios");
            //Proceso
            try
            {
                Producto newProducto = new()
                {
                    prod_name = requestProducto.prod_name,
                    prod_details = requestProducto.prod_details,
                    prod_price = requestProducto.prod_price,
                    prod_stock = requestProducto.prod_stock,
                    prod_image = requestProducto.prod_image,
                    cat_id = requestProducto.cat_id,
                    est_id = requestProducto.est_id,
                };
                dbContext.Productos.Add(newProducto);
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;
                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(SaveProductoAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> UpdateProductoAsync(ProductoDTO requestProducto)
        {
            //Validacion
            if (requestProducto == null) throw new ArgumentNullException(nameof(requestProducto), $"Error los campos estan nulos o vacios");

            //Proceso
            try
            {
                var dataProducto = await dbContext.Productos.FirstAsync(p => p.prod_id.Equals(requestProducto.prod_id));
                if (dataProducto == null) throw new KeyNotFoundException($"Error: El producto no existe");
                dataProducto.prod_name = requestProducto.prod_name;
                dataProducto.prod_details = requestProducto.prod_details;
                dataProducto.prod_price = requestProducto.prod_price;
                dataProducto.prod_stock = requestProducto.prod_stock;
                dataProducto.prod_image = requestProducto.prod_image;
                dataProducto.cat_id = requestProducto.cat_id;
                dataProducto.est_id = requestProducto.est_id;

                dbContext.Entry(dataProducto).State = EntityState.Modified;
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;

                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(UpdateProductoAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }

        public async Task<bool> DeleteProductoAsync(ProductoDTO requestProducto)
        {
            //Validacion
            if (requestProducto == null) throw new ArgumentNullException(nameof(requestProducto), $"Error los campos estan nulos o vacios");

            //Proceso
            try
            {
                var dataProducto = await dbContext.Productos.FirstAsync(p => p.prod_id.Equals(requestProducto.prod_id));
                if (dataProducto == null) throw new KeyNotFoundException($"Error: El producto no existe");
                dbContext.Productos.Remove(dataProducto);
                var result = await dbContext.SaveChangesAsync() > 0;
                if (!result) return false;
                return true;
            }
            catch (Exception ex)
            {
                await logServices.RegisterLogAsync(new MsgLog
                {
                    log_TargetSiteName = ex.TargetSite?.Name ?? nameof(DeleteProductoAsync),
                    log_GetTypeName = ex.GetType().FullName! ?? $"No Identificado",
                    log_Message = ex.Message
                });
                throw;
            }
        }
    }
}