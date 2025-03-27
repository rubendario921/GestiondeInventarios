using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace inventario_api.Models;

public partial class InventarioBDDContext : DbContext
{
    public InventarioBDDContext()
    {
    }

    public InventarioBDDContext(DbContextOptions<InventarioBDDContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Log> Logs { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=GTEPRJ03;Database=InventarioBDD;User Id=sa;Password=Password01;Trusted_Connection = True; Encrypt = False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.cat_id);

            entity.Property(e => e.cat_details).HasMaxLength(50);
            entity.Property(e => e.cat_group).HasMaxLength(50);
            entity.Property(e => e.cat_name).HasMaxLength(50);
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.est_id);

            entity.Property(e => e.est_color).HasMaxLength(50);
            entity.Property(e => e.est_details).HasMaxLength(50);
            entity.Property(e => e.est_name).HasMaxLength(50);
        });

        modelBuilder.Entity<Log>(entity =>
        {
            entity.HasKey(e => e.log_id);
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.prod_id);

            entity.Property(e => e.prod_details).HasMaxLength(50);
            entity.Property(e => e.prod_name).HasMaxLength(50);
            entity.Property(e => e.prod_price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.cat).WithMany(p => p.Productos)
                .HasForeignKey(d => d.cat_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Productos_Categorias");

            entity.HasOne(d => d.est).WithMany(p => p.Productos)
                .HasForeignKey(d => d.est_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Productos_Estados");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
