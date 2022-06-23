import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/client-pages/post-list/post-list.component';
import { ProductsListComponent } from './components/client-pages/products-list/products-list.component';
import { CanAccessAdminGuard } from './guards/can-access-admin.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminBannerFormComponent } from './pages/admin/admin-banner/admin-banner-form/admin-banner-form.component';
import { AdminBannerListComponent } from './pages/admin/admin-banner/admin-banner-list/admin-banner-list.component';
import { AdminCategoryFormComponent } from './pages/admin/admin-category/admin-category-form/admin-category-form.component';
import { AdminCategoryListComponent } from './pages/admin/admin-category/admin-category-list/admin-category-list.component';
import { AdminPostFormComponent } from './pages/admin/admin-posts/admin-post-form/admin-post-form.component';
import { AdminPostListComponent } from './pages/admin/admin-posts/admin-post-list/admin-post-list.component';
import { AdminProductFormComponent } from './pages/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminUserFormComponent } from './pages/admin/admin-users/admin-user-form/admin-user-form.component';
import { AdminUserListComponent } from './pages/admin/admin-users/admin-user-list/admin-user-list.component';
import { CartComponent } from './pages/client-pase/cart/cart.component';
import { HomepagesComponent } from './pages/client-pase/homepages/homepages.component';
import { PostDetailComponent } from './pages/client-pase/post-detail/post-detail.component';
import { ProductDetailComponent } from './pages/client-pase/product-detail/product-detail.component';
import { SigninComponent } from './pages/client-pase/signin/signin.component';
import { SignupComponent } from './pages/client-pase/signup/signup.component';


const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepagesComponent

      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductsListComponent
          },
          {
            path: ':id',
            component: ProductDetailComponent
          }
        ]
      },
      {
        path: 'cart',
        component: CartComponent

      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostListComponent
          },
          {
            path: ':id',
            component: PostDetailComponent
          }
        ]

      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [CanAccessAdminGuard],
    children: [
      {
        path: 'post',
        children: [
          {
            path: '',
            component: AdminPostListComponent
          },

          {
            path: 'create',
            component: AdminPostFormComponent
          },
          {
            path: 'edit/:id',
            component: AdminPostFormComponent
          },

        ]
      },
      
      {
        path: 'user',
        children: [
          {
            path: '',
            component: AdminUserListComponent
          },

          {
            path: 'create',
            component: AdminUserFormComponent
          },
          {
            path: 'edit/:id',
            component: AdminUserFormComponent
          },
        ]
      },
      {
        path: 'products',
        children: [

          {
            path: '',
            component: AdminProductListComponent
          },

          {
            path: 'create',
            component: AdminProductFormComponent
          },
          {
            path: 'edit/:id',
            component: AdminProductFormComponent
          },
        ]
      },
      {
        path: 'banner',
        children: [
          {
            path: '',
            component: AdminBannerListComponent
          },

          {
            path: 'create',
            component: AdminBannerFormComponent
          },
          {
            path: 'edit/:id',
            component: AdminBannerFormComponent
          },
        ]
      },


    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanAccessAdminGuard] // Đưa vào để các route trên có thể sử dụng
})
export class AppRoutingModule { }
