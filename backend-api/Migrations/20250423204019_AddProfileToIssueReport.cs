using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_api.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileToIssueReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IssueReports_Profiles_ProfileId",
                table: "IssueReports");

            migrationBuilder.DropIndex(
                name: "IX_IssueReports_ProfileId",
                table: "IssueReports");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_IssueReports_ProfileId",
                table: "IssueReports",
                column: "ProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_IssueReports_Profiles_ProfileId",
                table: "IssueReports",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");
        }
    }
}
