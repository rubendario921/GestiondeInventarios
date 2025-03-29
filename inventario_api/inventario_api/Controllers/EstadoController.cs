using inventario_api.DTOs;
using inventario_api.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inventario_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly IEstadoServices estadoServices;

        public EstadoController(IEstadoServices estadoServices)
        {
            this.estadoServices = estadoServices;
        }

        [HttpGet]
        [Route("GetAllEstados")]
        public async Task<ActionResult<IEnumerable<EstadoDTO>>> GetAllEstados()
        {
            //Proceso
            try
            {
                var result = await estadoServices.GetAllEstados();
                if (result == null) return NotFound($"No Existe informacion ");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("SaveEstado")]
        public async Task<ActionResult<bool>> SaveEstado(EstadoDTO requestEstado)
        {
            //Validacion
            if (requestEstado == null) return BadRequest($"Campos vacios o nulos en {nameof(requestEstado)}");

            //Proceso
            try
            {
                var result = await estadoServices.SaveEstadoAsync(requestEstado);
                if (!result) return BadRequest("Error al guardar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("UpdateEstado/{id}")]
        public async Task<ActionResult<bool>> UpdateEstado(EstadoDTO requestEstado)
        {
            //Validacion
            if (requestEstado == null) return BadRequest($"Campos vacios o nulos en {nameof(requestEstado)}");

            //Proceso
            try
            {
                var result = await estadoServices.UpdateEstadoAsync(requestEstado);
                if (!result) return BadRequest("Error al actualizar la informacion");
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("DeleteEstado/{id}")]
        public async Task<ActionResult<bool>> DeleteEstado(int id)
        {
            //Validacion
            if (id < 0) return BadRequest($"Campos vacios o nulos en {nameof(id)}");
            //Proceso
            try
            {
                var result = await estadoServices.DeleteEstadosAsync(id);
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