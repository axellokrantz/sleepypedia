using Microsoft.EntityFrameworkCore;
using Sleepypedia.Models;
namespace Sleepypedia.Data;

public class ArticleContextCollection(DbContextOptions<ArticleContextCollection> options) : DbContext(options)
{
    public DbSet<Article> Articles { get; set; }
}