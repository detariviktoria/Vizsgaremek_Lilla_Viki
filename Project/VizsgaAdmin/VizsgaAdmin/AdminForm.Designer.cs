﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
namespace VizsgaAdmin
{
    partial class AdminForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.listBoxGifts = new System.Windows.Forms.ListBox();
            this.btnDelete = new System.Windows.Forms.Button();
            this.labelTitle = new System.Windows.Forms.Label();
            this.btnRefresh = new System.Windows.Forms.Button();
            this.txtNev = new System.Windows.Forms.TextBox();
            this.txtAr = new System.Windows.Forms.TextBox();
            this.txtLeiras = new System.Windows.Forms.TextBox();
            this.txtKategoria = new System.Windows.Forms.TextBox();
            this.labelNev = new System.Windows.Forms.Label();
            this.labelAr = new System.Windows.Forms.Label();
            this.labelLeiras = new System.Windows.Forms.Label();
            this.labelKategoria = new System.Windows.Forms.Label();
            this.btnAdd = new System.Windows.Forms.Button();
            this.btnEdit = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // listBoxGifts
            // 
            this.listBoxGifts.FormattingEnabled = true;
            this.listBoxGifts.Location = new System.Drawing.Point(12, 50);
            this.listBoxGifts.Name = "listBoxGifts";
            this.listBoxGifts.Size = new System.Drawing.Size(400, 300);
            this.listBoxGifts.TabIndex = 0;
            // 
            // btnDelete
            // 
            this.btnDelete.BackColor = System.Drawing.Color.IndianRed;
            this.btnDelete.ForeColor = System.Drawing.Color.White;
            this.btnDelete.Location = new System.Drawing.Point(430, 50);
            this.btnDelete.Name = "btnDelete";
            this.btnDelete.Size = new System.Drawing.Size(120, 40);
            this.btnDelete.TabIndex = 1;
            this.btnDelete.Text = "Törlés";
            this.btnDelete.UseVisualStyleBackColor = false;
            this.btnDelete.Click += new System.EventHandler(this.btnDelete_Click);
            // 
            // labelTitle
            // 
            this.labelTitle.AutoSize = true;
            this.labelTitle.Location = new System.Drawing.Point(12, 13);
            this.labelTitle.Name = "labelTitle";
            this.labelTitle.Size = new System.Drawing.Size(219, 24);
            this.labelTitle.TabIndex = 2;
            this.labelTitle.Text = "Ajándékok Kezelése";
            // 
            // btnRefresh
            // 
            this.btnRefresh.Location = new System.Drawing.Point(430, 100);
            this.btnRefresh.Name = "btnRefresh";
            this.btnRefresh.Size = new System.Drawing.Size(120, 30);
            this.btnRefresh.TabIndex = 3;
            this.btnRefresh.Text = "Frissítés";
            this.btnRefresh.UseVisualStyleBackColor = true;
            this.btnRefresh.Click += new System.EventHandler(this.btnRefresh_Click);
            // 
            // txtNev
            // 
            this.txtNev.Location = new System.Drawing.Point(430, 150);
            this.txtNev.Name = "txtNev";
            this.txtNev.Size = new System.Drawing.Size(140, 20);
            this.txtNev.TabIndex = 4;
            // 
            // txtAr
            // 
            this.txtAr.Location = new System.Drawing.Point(430, 190);
            this.txtAr.Name = "txtAr";
            this.txtAr.Size = new System.Drawing.Size(140, 20);
            this.txtAr.TabIndex = 5;
            // 
            // txtLeiras
            // 
            this.txtLeiras.Location = new System.Drawing.Point(430, 230);
            this.txtLeiras.Name = "txtLeiras";
            this.txtLeiras.Size = new System.Drawing.Size(140, 20);
            this.txtLeiras.TabIndex = 6;
            // 
            // txtKategoria
            // 
            this.txtKategoria.Location = new System.Drawing.Point(430, 270);
            this.txtKategoria.Name = "txtKategoria";
            this.txtKategoria.Size = new System.Drawing.Size(140, 20);
            this.txtKategoria.TabIndex = 7;
            // 
            // labelNev
            // 
            this.labelNev.AutoSize = true;
            this.labelNev.Location = new System.Drawing.Point(430, 134);
            this.labelNev.Name = "labelNev";
            this.labelNev.Size = new System.Drawing.Size(27, 13);
            this.labelNev.TabIndex = 8;
            this.labelNev.Text = "Név";
            // 
            // labelAr
            // 
            this.labelAr.AutoSize = true;
            this.labelAr.Location = new System.Drawing.Point(430, 174);
            this.labelAr.Name = "labelAr";
            this.labelAr.Size = new System.Drawing.Size(17, 13);
            this.labelAr.TabIndex = 9;
            this.labelAr.Text = "Ár";
            // 
            // labelLeiras
            // 
            this.labelLeiras.AutoSize = true;
            this.labelLeiras.Location = new System.Drawing.Point(430, 214);
            this.labelLeiras.Name = "labelLeiras";
            this.labelLeiras.Size = new System.Drawing.Size(37, 13);
            this.labelLeiras.TabIndex = 10;
            this.labelLeiras.Text = "Leírás";
            // 
            // labelKategoria
            // 
            this.labelKategoria.AutoSize = true;
            this.labelKategoria.Location = new System.Drawing.Point(430, 254);
            this.labelKategoria.Name = "labelKategoria";
            this.labelKategoria.Size = new System.Drawing.Size(52, 13);
            this.labelKategoria.TabIndex = 11;
            this.labelKategoria.Text = "Kategória";
            // 
            // btnAdd
            // 
            this.btnAdd.Location = new System.Drawing.Point(430, 310);
            this.btnAdd.Name = "btnAdd";
            this.btnAdd.Size = new System.Drawing.Size(65, 30);
            this.btnAdd.TabIndex = 12;
            this.btnAdd.Text = "Hozzáad";
            this.btnAdd.UseVisualStyleBackColor = true;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);
            // 
            // btnEdit
            // 
            this.btnEdit.Location = new System.Drawing.Point(505, 310);
            this.btnEdit.Name = "btnEdit";
            this.btnEdit.Size = new System.Drawing.Size(65, 30);
            this.btnEdit.TabIndex = 13;
            this.btnEdit.Text = "Módosít";
            this.btnEdit.UseVisualStyleBackColor = true;
            this.btnEdit.Click += new System.EventHandler(this.btnEdit_Click);
            // 
            // AdminForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(600, 400);
            this.Controls.Add(this.btnEdit);
            this.Controls.Add(this.btnAdd);
            this.Controls.Add(this.labelKategoria);
            this.Controls.Add(this.labelLeiras);
            this.Controls.Add(this.labelAr);
            this.Controls.Add(this.labelNev);
            this.Controls.Add(this.txtKategoria);
            this.Controls.Add(this.txtLeiras);
            this.Controls.Add(this.txtAr);
            this.Controls.Add(this.txtNev);
            this.Controls.Add(this.btnRefresh);
            this.Controls.Add(this.labelTitle);
            this.Controls.Add(this.btnDelete);
            this.Controls.Add(this.listBoxGifts);
            this.Name = "AdminForm";
            this.Text = "VizsgaRemek Admin";
            this.Load += new System.EventHandler(this.AdminForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListBox listBoxGifts;
        private System.Windows.Forms.Button btnDelete;
        private System.Windows.Forms.Label labelTitle;
        private System.Windows.Forms.Button btnRefresh;
        private System.Windows.Forms.TextBox txtNev;
        private System.Windows.Forms.TextBox txtAr;
        private System.Windows.Forms.TextBox txtLeiras;
        private System.Windows.Forms.TextBox txtKategoria;
        private System.Windows.Forms.Label labelNev;
        private System.Windows.Forms.Label labelAr;
        private System.Windows.Forms.Label labelLeiras;
        private System.Windows.Forms.Label labelKategoria;
        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Button btnEdit;
    }
}