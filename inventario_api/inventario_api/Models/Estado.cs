using System;
using System.Collections.Generic;

namespace inventario_api.Models;

public partial class Estado
{
    public int est_id { get; set; }

    public string est_name { get; set; } = null!;

    public string? est_details { get; set; }

    public string? est_color { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
