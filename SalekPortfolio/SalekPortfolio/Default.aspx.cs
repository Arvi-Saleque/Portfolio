using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

namespace Arvisportfolio
{
    public partial class _Default : System.Web.UI.Page
    {
        private readonly string cs =
            ConfigurationManager.ConnectionStrings["ArvisDb"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) BindGrid();
        }

        private void BindGrid()
        {
            using (var con = new SqlConnection(cs))
            using (var da = new SqlDataAdapter(
                "SELECT Id, Name, Title, Description, Email, Phone FROM dbo.Intro ORDER BY Id DESC", con))
            {
                var dt = new DataTable();
                da.Fill(dt);
                gvIntro.DataSource = dt;
                gvIntro.DataBind();
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text) || string.IsNullOrWhiteSpace(txtTitle.Text))
            {
                lblMsg.Text = "Name and Title are required.";
                return;
            }

            using (var con = new SqlConnection(cs))
            using (var cmd = new SqlCommand(
                @"INSERT INTO dbo.Intro (Name, Title, Description, Email, Phone)
                  VALUES (@Name, @Title, @Description, @Email, @Phone);", con))
            {
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = txtName.Text.Trim();
                cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 150).Value = txtTitle.Text.Trim();
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar).Value = txtDesc.Text.Trim();
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 150).Value = txtEmail.Text.Trim();
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 50).Value = txtPhone.Text.Trim();

                con.Open();
                cmd.ExecuteNonQuery();
            }

            txtName.Text = txtTitle.Text = txtDesc.Text = txtEmail.Text = txtPhone.Text = string.Empty;
            lblMsg.Text = "Saved!";
            BindGrid();
        }

        protected void gvIntro_RowEditing(object sender, GridViewEditEventArgs e)
        {
            gvIntro.EditIndex = e.NewEditIndex;
            BindGrid();
        }

        protected void gvIntro_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            gvIntro.EditIndex = -1;
            BindGrid();
        }

        protected void gvIntro_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int id = Convert.ToInt32(gvIntro.DataKeys[e.RowIndex].Value);
            GridViewRow row = gvIntro.Rows[e.RowIndex];

            string name = ((TextBox)row.Cells[1].Controls[0]).Text.Trim();
            string title = ((TextBox)row.Cells[2].Controls[0]).Text.Trim();
            string desc = ((TextBox)row.Cells[3].Controls[0]).Text.Trim();
            string email = ((TextBox)row.Cells[4].Controls[0]).Text.Trim();
            string phone = ((TextBox)row.Cells[5].Controls[0]).Text.Trim();

            using (var con = new SqlConnection(cs))
            using (var cmd = new SqlCommand(
                @"UPDATE dbo.Intro
                  SET Name=@Name, Title=@Title, Description=@Description, Email=@Email, Phone=@Phone
                  WHERE Id=@Id;", con))
            {
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = name;
                cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 150).Value = title;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar).Value = desc;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 150).Value = email;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 50).Value = phone;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;

                con.Open();
                cmd.ExecuteNonQuery();
            }

            gvIntro.EditIndex = -1;
            BindGrid();
            lblMsg.Text = "Updated.";
        }

        protected void gvIntro_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int id = Convert.ToInt32(gvIntro.DataKeys[e.RowIndex].Value);

            using (var con = new SqlConnection(cs))
            using (var cmd = new SqlCommand("DELETE FROM dbo.Intro WHERE Id=@Id;", con))
            {
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                con.Open();
                cmd.ExecuteNonQuery();
            }

            BindGrid();
            lblMsg.Text = "Deleted.";
        }
    }
}
