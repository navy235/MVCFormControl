using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Web.Mvc;
using Maitonn.Core;

namespace MVCFormControl.Models
{
    public class FormModel
    {

        public FormModel()
        {
            this.Number = 1;
            this.MemberCount = 1;
            this.AddTime = DateTime.Now;
        }


        //For ID Not EditAble
        [HiddenInput(DisplayValue = false)]
        public int ID { get; set; }

        [Required(ErrorMessage = "请设置在线人数")]
        [Display(Name = "在线人数")]
        [UIHint("IntegerExtension")]
        [AdditionalMetadata("IntegerExtension", "1,200")]
        [AdditionalMetadata("IntegerExtensionUnit", "人")]
        [HintLabel("在线人数范围在1~200之间")]
        public int Number { get; set; }

        [Required(ErrorMessage = "请设置在线会员")]
        [Display(Name = "在线会员")]
        [UIHint("IntegerExtension")]
        [AdditionalMetadata("IntegerExtension", "1,200")]
        [AdditionalMetadata("IntegerExtensionUnit", "人")]
        [HintLabel("在线会员范围在1~200之间")]
        public int MemberCount { get; set; }

        [Required(ErrorMessage = "请输入会员名称")]
        [Display(Name = "会员名称")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "请上传比赛标志")]
        [Display(Name = "比赛标志")]
        [UIHint("UploadImg")]
        public string ImgUrl { get; set; }

        [Required(ErrorMessage = "请选择添加时间")]
        [Display(Name = "添加时间")]
        [UIHint("Date")]
        public DateTime AddTime { get; set; }

        [Display(Name = "参赛战队")]
        [Required(ErrorMessage = "请选择参赛战队")]
        [UIHint("ForeignKeyForCheck")]
        public string Teams { get; set; }

        [Required(ErrorMessage = "请选择选手所属战队")]
        [Display(Name = "所属战队")]
        [UIHint("ForeignKeyForRadio")]
        public int TeamID { get; set; }


        [Required(ErrorMessage = "请选择战队关系")]
        [Display(Name = "战队关系")]
        [UIHint("RadioList")]
        [AdditionalMetadata("RadioList", "离开,加入")]
        public bool Status { get; set; }

        [Display(Name = "参赛战队")]
        [Required(ErrorMessage = "请选择参赛战队")]
        [UIHint("CheckList")]
        [CheckMaxLength(5)]
        public string TeamAs { get; set; }


        [Required(ErrorMessage = "请选择所在城市")]
        [Display(Name = "所在城市")]
        [UIHint("CascadingSelect")]
        [AdditionalMetadata("CascadingSelect", "P")]
        public int CityCode { get; set; }

        [Required(ErrorMessage = "请上传头像")]
        [Display(Name = "上传头像")]
        [UIHint("UploadImgEdit")]
        [AdditionalMetadata("UploadImgEdit", "200|200")]
        [AdditionalMetadata("mustUpload", false)]
        public string AvtarUrl { get; set; }

        [Required(ErrorMessage = "请上传媒体图片.")]
        [Display(Name = "媒体图片")]
        [UIHint("UploadImgList")]
        [AdditionalMetadata("UploadImgList", "")]
        [AdditionalMetadata("UploadImgListMaxLength", "6")]
        [HintLabel("请上传1-6张不小于800X600像素的图片,每张图片大小不超过5M")]
        public string MediaImg { get; set; }


        [Display(Name = "地图坐标")]
        [Required(ErrorMessage = "请标记媒体地图坐标.")]
        [UIHint("MapMarker")]
        public string Position { get; set; }


        [Required(ErrorMessage = "请选择类别")]
        [Display(Name = "类别")]
        [UIHint("Cascading")]
        public string CategoryCode { get; set; }


    }
}