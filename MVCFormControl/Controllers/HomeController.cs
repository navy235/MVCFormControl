using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVCFormControl.Models;
namespace MVCFormControl.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {

            var selectlist = new List<SelectListItem>();

            for (var i = 0; i < 20; i++)
            {
                selectlist.Add(new SelectListItem()
                {
                    Text = "测试select" + i.ToString(),
                    Value = i.ToString()
                });
            }
            ViewBag.Data_Teams = selectlist;
            ViewBag.Data_TeamID = selectlist;
            ViewBag.Data_TeamAs = selectlist;
            ViewBag.Data_CategoryCode = "";
            return View(new FormModel());
        }


        public ActionResult Edit()
        {

            var model = new FormModel()
            {
                AddTime = DateTime.Now.AddDays(7),
                CityCode = 41,
                ImgUrl = "/Upload/normal/2013/8/28/dc98fa16-ba34-43b4-9abf-bfd10182e204.JPG",
                MemberCount = 30,
                Number = 40,
                Status = false,
                TeamAs = "3,5,7",
                TeamID = 4,
                Teams = "1,9,13,18",
                UserName = "刁进平",
                AvtarUrl = "/Upload/normal/2013/8/28/dc98fa16-ba34-43b4-9abf-bfd10182e204.JPG",

            };
            ViewBag.Data_CategoryCode = "3,31,313,3132";
            ViewBag.Data_Teams = SetSelectedValue(model.Teams.Split(',').Select(x => Convert.ToInt32(x)).ToList());
            ViewBag.Data_TeamID = SetSelectedValue(new List<int>() { model.TeamID });
            ViewBag.Data_TeamAs = SetSelectedValue(model.TeamAs.Split(',').Select(x => Convert.ToInt32(x)).ToList());
            return View(model);
        }

        public List<SelectListItem> SetSelectedValue(List<int> ValueList)
        {
            var list = getlist();

            foreach (var l in list)
            {
                if (ValueList.Contains(Convert.ToInt32(l.Value)))
                {
                    l.Selected = true;
                }
            }
            return list;
        }

        private List<SelectListItem> getlist()
        {
            var selectlist = new List<SelectListItem>();

            for (var i = 0; i < 20; i++)
            {
                selectlist.Add(new SelectListItem()
                {
                    Text = "测试select" + i.ToString(),
                    Value = i.ToString()
                });
            }

            return selectlist;
        }

    }
}
