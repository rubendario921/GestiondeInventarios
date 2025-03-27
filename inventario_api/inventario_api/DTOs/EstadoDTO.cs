namespace inventario_api.DTOs
{
    public class EstadoDTO
    {
        public int est_id { get; set; }

        public string est_name { get; set; } = string.Empty;

        public string? est_details { get; set; } = string.Empty;

        public string? est_color { get; set; } = string.Empty;
    }
}