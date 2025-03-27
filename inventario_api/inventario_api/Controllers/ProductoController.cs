using inventario_api.DTOs;
using inventario_api.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inventario_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoServices productoServices;

        public ProductoController(IProductoServices productoServices)
        {
            this.productoServices = productoServices;
        }

        [HttpGet]
        [Route("GetAllProductos")]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetAllProductos()
        {
            //Proceso
            try
            {
                var result = await productoServices.GetAllProductos();
                if (result == null) return NotFound($"No Existe informacion ");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("SaveProductos")]
        public async Task<ActionResult<bool>> SaveProductos(ProductoDTO requestProducto)
        {
            //Validacion
            if (requestProducto == null) return BadRequest($"Campos vacios o nulos en {nameof(requestProducto)}");

            //Proceso
            try
            {
                var result = await productoServices.SaveProductoAsync(requestProducto);
                if (!result) return BadRequest("Error al guardar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("UpdateProductos/{id}")]
        public async Task<ActionResult<bool>> UpdateProductos(ProductoDTO requestProducto)
        {
            //Validacion
            if (requestProducto == null) return BadRequest($"Campos vacios o nulos en {nameof(requestProducto)}");

            //Proceso
            try
            {
                var result = await productoServices.UpdateProductoAsync(requestProducto);
                if (!result) return BadRequest("Error al actualizar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("DeleteProductos/{id}")]
        public async Task<ActionResult<bool>> DeleteProductos(int id)
        {
            //Validacion
            if (id<=0) return BadRequest($"Campos vacios o nulos en {nameof(id)}");

            //Proceso
            try
            {

                var result = await productoServices.DeleteProductoAsync(id);
                if (!result) return BadRequest("Error al eliminar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}