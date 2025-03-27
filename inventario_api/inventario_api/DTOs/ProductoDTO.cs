using inventario_api.Models;

namespace inventario_api.DTOs
{
    public class ProductoDTO
    {
        public int prod_id { get; set; }

        public string prod_name { get; set; } = string.Empty;

        public string prod_details { get; set; } = string.Empty;

        public int cat_id { get; set; }

        public string prod_image { get; set; } = string.Empty;

        public decimal prod_price { get; set; }

        public int prod_stock { get; set; }

        public int est_id { get; set; }

        public string categoria { get; set; } = string.Empty;

        public string estado { get; set; } = string.Empty;
    }
}