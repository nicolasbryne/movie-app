<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark app-header">
    <div class="container-fluid justify-content-start">
      <a class="navbar-brand text-light" href="#">
        <span>YOTESHIN</span>
      </a>
      <button type="button" id="sidebarCollapse" class="btn-transparent text-info">
        <i class="fa fa-bars"></i>
      </button>
      <ul class="nav navbar-nav d-md-down-none">
        <li class="nav-item px-3">
          <a class="nav-link text-secondary" href="#">Dashboard</a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link text-secondary" href="#">Users</a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link text-secondary" href="#">Settings</a>
        </li>
      </ul>

      <ul class="nav navbar-nav ml-auto align-items-center">
        <v-dropdown icon="bell" 
                    header="You have 5 pending tasks" 
                    endbutton="View all tasks"
                    tag="li"
                    classes="nav-item  d-md-down-none"  
                    btnTag="a"
                    btnClasses="nav-link text-secondary"
                    
        >
          <template slot="dropdown-items">
            <a class="dropdown-item" href="#">
              <div class="small mb-1">Upgrade NPM &amp; Bower
                <span class="float-right">
                  <strong>0%</strong>
                </span>
              </div>
              <span class="progress progress-xs">
                <div class="progress-bar bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </span>
            </a>
          </template>
        </v-dropdown>

        <v-dropdown icon="list-alt"
                    header="You have 5 pending tasks"
                    badge="15"    
                    endbutton="View all tasks"
                    tag="li"  
                    classes="nav-item  d-md-down-none"  
                    btnTag="a"
                    btnClasses="nav-link text-secondary"            
        >
          <template slot="dropdown-items">        
            <a class="dropdown-item" href="#">
              <div class="small mb-1">Upgrade NPM &amp; Bower
                <span class="float-right">
                  <strong>0%</strong>
                </span>
              </div>
              <span class="progress progress-xs">
                <div class="progress-bar bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </span>
            </a>
            <a class="dropdown-item" href="#">
              <div class="small mb-1">ReactJS Version
                <span class="float-right">
                  <strong>25%</strong>
                </span>
              </div>
              <span class="progress progress-xs">
                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </span>
            </a>
            <a class="dropdown-item" href="#">
              <div class="small mb-1">VueJS Version
                <span class="float-right">
                  <strong>50%</strong>
                </span>
              </div>
              <span class="progress progress-xs">
                <div class="progress-bar bg-warning" role="progressbar" style="width: 50%" aria-valuenow="50"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </span>
            </a>
            <a class="dropdown-item" href="#">
              <div class="small mb-1">Add new layouts
                <span class="float-right">
                  <strong>75%</strong>
                </span>
              </div>
              <span class="progress progress-xs">
                <div class="progress-bar bg-info" role="progressbar" style="width: 75%" aria-valuenow="75"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </span>
            </a>
            <a class="dropdown-item" href="#">
              <div class="small mb-1">Angular 2 Cli Version
                <span class="float-right">
                  <strong>100%</strong>
                </span>
              </div>
              <span class="progress progress-xs">
                <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </span>
            </a>
          </template>
        </v-dropdown>

        <li class="nav-item dropdown d-md-down-none">
          <a class="nav-link text-secondary" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">
            <i class="fa fa-envelope"></i>
            <span class="badge badge-pill badge-info">7</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg">
            <div class="dropdown-header text-center">
              <strong>You have 4 messages</strong>
            </div>
            <a class="dropdown-item" href="#">
              <div class="message">
                <div class="py-3 mr-3 float-left">
                  <div class="avatar">
                    <img class="img-avatar" src="https://lh5.googleusercontent.com/-bVUxg2zY3Rg/AAAAAAAAAAI/AAAAAAAAAJ4/hhQQJRbCAA8/photo.jpg?sz=50"
                      alt="admin@bootstrapmaster.com">
                    <span class="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small class="text-muted">John Doe</small>
                  <small class="text-muted float-right mt-1">Just now</small>
                </div>
                <div class="text-truncate font-weight-bold">
                  <span class="fa fa-exclamation text-danger"></span> Important message</div>
                <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed
                  do eiusmod tempor incididunt...</div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="message">
                <div class="py-3 mr-3 float-left">
                  <div class="avatar">
                    <img class="img-avatar" src="https://lh5.googleusercontent.com/-bVUxg2zY3Rg/AAAAAAAAAAI/AAAAAAAAAJ4/hhQQJRbCAA8/photo.jpg?sz=50"
                      alt="admin@bootstrapmaster.com">
                    <span class="avatar-status badge-warning"></span>
                  </div>
                </div>
                <div>
                  <small class="text-muted">John Doe</small>
                  <small class="text-muted float-right mt-1">5 minutes ago</small>
                </div>
                <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed
                  do eiusmod tempor incididunt...</div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="message">
                <div class="py-3 mr-3 float-left">
                  <div class="avatar">
                    <img class="img-avatar" src="https://lh5.googleusercontent.com/-bVUxg2zY3Rg/AAAAAAAAAAI/AAAAAAAAAJ4/hhQQJRbCAA8/photo.jpg?sz=50"
                      alt="admin@bootstrapmaster.com">
                    <span class="avatar-status badge-danger"></span>
                  </div>
                </div>
                <div>
                  <small class="text-muted">John Doe</small>
                  <small class="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed
                  do eiusmod tempor incididunt...</div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="message">
                <div class="py-3 mr-3 float-left">
                  <div class="avatar">
                    <img class="img-avatar" src="https://lh5.googleusercontent.com/-bVUxg2zY3Rg/AAAAAAAAAAI/AAAAAAAAAJ4/hhQQJRbCAA8/photo.jpg?sz=50"
                      alt="admin@bootstrapmaster.com">
                    <span class="avatar-status badge-info"></span>
                  </div>
                </div>
                <div>
                  <small class="text-muted">John Doe</small>
                  <small class="text-muted float-right mt-1">4:03 PM</small>
                </div>
                <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed
                  do eiusmod tempor incididunt...</div>
              </div>
            </a>
            <a class="dropdown-item text-center" href="#">
              <strong>View all messages</strong>
            </a>
          </div>
        </li>
        <v-dropdown title="Kaung Myat"
                    header="Account"
                    tag="li"  
                    classes="nav-item  d-md-down-none" 
                    btnTag="a"
                    btnClasses="nav-link text-secondary"
        >
          <img slot="image" class="img-avatar" src="https://lh5.googleusercontent.com/-bVUxg2zY3Rg/AAAAAAAAAAI/AAAAAAAAAJ4/hhQQJRbCAA8/photo.jpg?sz=50"
              alt="admin@bootstrapmaster.com">
          <template slot="dropdown-items">
            <a class="dropdown-item small text-dark" href="#">
              <i class="fa fa-user mr-2 text-info"></i> Profile
            </a>
            <a class="dropdown-item small text-dark" href="#">
              <i class="fa fa-wrench mr-2 text-info"></i> Settings
            </a>
            <div class="divider"></div>
            <a class="dropdown-item small text-dark" href="#">
              <i class="fa fa-user-shield mr-2 text-info"></i> Lock Account
            </a>
            <a class="dropdown-item small text-dark" href="/logout">
              <i class="fa fa-lock mr-2 text-info"></i> Logout
            </a>
          </template>
          
        </v-dropdown>
      </ul>
    </div>
  </nav>

</template>

<script>

import VDropdown from '@/components/VDropdown';
export default {
  components : {
    VDropdown
  }
}
</script>

