using System;
using System.Collections.Generic;

namespace inventario_api.Models;

public partial class Log
{
    public int log_id { get; set; }

    public string log_TargetSiteName { get; set; } = null!;

    public string log_GetTypeName { get; set; } = null!;

    public string log_Message { get; set; } = null!;
}
