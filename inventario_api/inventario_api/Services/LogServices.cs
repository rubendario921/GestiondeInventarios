using inventario_api.DTOs;
using inventario_api.Interfaces;
using inventario_api.Models;

namespace inventario_api.Services
{
    public class LogServices : ILogServices
    {
        private readonly InventarioBDDContext dbContext;

        public LogServices(InventarioBDDContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> RegisterLogAsync(MsgLog msgLog)
        {
            //Validacion Inicial
            if (msgLog == null) throw new ArgumentNullException(nameof(msgLog), $"Error los campos estan nulos o vacios");

            //Proceso
            try
            {
                Log newLog = new()
                {
                    log_TargetSiteName = msgLog.log_TargetSiteName,
                    log_GetTypeName = msgLog.log_GetTypeName,
                    log_Message = msgLog.log_Message
                };
                await dbContext.Logs.AddAsync(newLog);
                return await dbContext.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.TargetSite!.Name} {ex.GetType().Name} {ex.Message}");
                throw;
            }
        }
    }
}