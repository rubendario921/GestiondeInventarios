using inventario_api.Models;

namespace inventario_api.DTOs
{
    public class ProductoDTO
    {
        public int prod_id { get; set; }

        public string prod_name { get; set; } = string.Empty;

        public string prod_details { get; set; } = string.Empty;


        public string prod_image { get; set; } = string.Empty;

        public decimal prod_price { get; set; }

        public int prod_stock { get; set; }
        public int cat_id { get; set; }

        public int est_id { get; set; }

        public string catName { get; set; } = string.Empty;

        public string estName { get; set; } = string.Empty;
        public string estColor { get; set; } = string.Empty;
    }
}