using inventario_api.DTOs;
using inventario_api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace inventario_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaServices categoriaServices;

        public CategoriaController(ICategoriaServices categoriaServices)
        {
            this.categoriaServices = categoriaServices;
        }

        [HttpGet]
        [Route("GetAllCategorias")]
        public async Task<ActionResult<IEnumerable<CategoriaDTO>>> GetAllCategorias()
        {
            //Proceso
            try
            {
                var result = await categoriaServices.GetAllCategorias();
                if (result == null) return NotFound($"No Existe informacion ");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("SaveCategoria")]
        public async Task<ActionResult<bool>> SaveCategoria(CategoriaDTO requestCategoria)
        {
            //Validacion
            if (requestCategoria == null) return BadRequest($"Campos vacios o nulos en {nameof(requestCategoria)}");

            try
            {
                var result = await categoriaServices.SaveCategoriaAsync(requestCategoria);
                if (!result) return BadRequest("Error al guardar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("UpdateCategoria/{id}")]
        public async Task<ActionResult<bool>> UpdateCategoria(CategoriaDTO requestCategoria)
        {
            if (requestCategoria == null) return BadRequest($"Campos vacios o nulos en {nameof(requestCategoria)}");

            try
            {
                var result = await categoriaServices.UpdateCategoriaAsync(requestCategoria);
                if (!result) return BadRequest("Error al actualizar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("DeleteCategoria/{id}")]
        public async Task<ActionResult<bool>> DeleteCategoria(int id)
        {
            if (id <= 0) return BadRequest($"Campos vacios o nulos en {nameof(id)}");

            try
            {
                var result = await categoriaServices.DeleteCategoriaAsync(id);
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