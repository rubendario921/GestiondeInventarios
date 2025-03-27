using System;
using System.Collections.Generic;

namespace inventario_api.Models;

public partial class Producto
{
    public int prod_id { get; set; }

    public string prod_name { get; set; } = null!;

    public string prod_details { get; set; } = null!;

    public int cat_id { get; set; }

    public string prod_image { get; set; } = null!;

    public decimal prod_price { get; set; }

    public int prod_stock { get; set; }

    public int est_id { get; set; }

    public virtual Categoria cat { get; set; } = null!;

    public virtual Estado est { get; set; } = null!;
}