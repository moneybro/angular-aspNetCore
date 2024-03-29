using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal;
using de_ot_portal.Contexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace de_ot_portal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args) // �������� ���������, ��������� ���������� ����� 
                .Build() // ���������� IHost
                .Run();  // ������ ����������
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)             //������������� ���������� ��������� (builder) ��� �������� IHostBuilder
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>(); // ����������� ������, ������� ������������� �� ��������� �������
                });
    }
}
