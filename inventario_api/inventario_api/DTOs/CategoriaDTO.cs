namespace inventario_api.DTOs
{
    public class CategoriaDTO
    {
        public int cat_id { get; set; }

        public string cat_name { get; set; } = string.Empty;

        public string cat_details { get; set; } = string.Empty;

        public string cat_group { get; set; } = string.Empty;
    }
}