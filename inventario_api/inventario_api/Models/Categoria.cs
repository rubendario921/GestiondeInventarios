using System;
using System.Collections.Generic;

namespace inventario_api.Models;

public partial class Categoria
{
    public int cat_id { get; set; }

    public string cat_name { get; set; } = null!;

    public string cat_details { get; set; } = null!;

    public string cat_group { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
