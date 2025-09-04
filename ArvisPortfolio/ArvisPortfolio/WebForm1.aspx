<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="ArvisPortfolio.WebForm1" %>



<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
  <div style="max-width:800px;margin:24px auto;font-family:Segoe UI;">
    <h2>Intro – Admin</h2>

    <asp:Label ID="lblMsg" runat="server" EnableViewState="false" />

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0;">
      <asp:TextBox ID="txtName"  runat="server" Placeholder="Full name"></asp:TextBox>
      <asp:TextBox ID="txtTitle" runat="server" Placeholder="Title (e.g., Software Developer)"></asp:TextBox>
      <asp:TextBox ID="txtEmail" runat="server" Placeholder="Email"></asp:TextBox>
      <asp:TextBox ID="txtPhone" runat="server" Placeholder="Phone"></asp:TextBox>
    </div>

    <asp:TextBox ID="txtDesc" runat="server" TextMode="MultiLine" Rows="4"
                 Width="100%" Placeholder="Short description/bio"></asp:TextBox><br />
    <asp:Button ID="btnAdd" runat="server" Text="Save Intro" OnClick="btnAdd_Click" />

    <hr />

    <asp:GridView ID="gvIntro" runat="server"
        AutoGenerateColumns="False"
        DataKeyNames="Id"
        AutoGenerateEditButton="True"
        OnRowEditing="gvIntro_RowEditing"
        OnRowCancelingEdit="gvIntro_RowCancelingEdit"
        OnRowUpdating="gvIntro_RowUpdating">
      <Columns>
        <asp:BoundField DataField="Id"           HeaderText="Id" ReadOnly="True" />
        <asp:BoundField DataField="Name"         HeaderText="Name" />
        <asp:BoundField DataField="Title"        HeaderText="Title" />
        <asp:BoundField DataField="Description"  HeaderText="Description" />
        <asp:BoundField DataField="Email"        HeaderText="Email" />
        <asp:BoundField DataField="Phone"        HeaderText="Phone" />
      </Columns>
    </asp:GridView>
  </div>
</form>


</body>
</html>
