<script lang="ts">
export default {
  name: 'SideNavigation',
}
</script>

<script setup lang="ts">
import SvgIcons from './SvgIcons.vue'
</script>

<template>
	<div class="grid lg:min-h-screen h-[250vh]">
		<div class="bg-primary lg:fixed absolute w-full lg:w-2/5 flex px-2 lg:px-6 py-3 logo h-[76px]">
			<img class="" src="../assets/Walure-logo-white.png" alt="walure-logo">
			<!-- <img class="xl:hidden" src="../assets/walure.png" alt="walure-logo"> -->
		</div>
		<div class="grid mt-28">
			<ul>
				<li>
					<router-link active-class="active" class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" to="/dashboard">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="menu" />  <!-- dashboard icon -->
							</div>
							<p class="text-[15px]">
								Dashboard
							</p>
						</div>
					</router-link>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex text-left items-center gap-4 py-4">
								<div>
									<SvgIcons name="course-management" /> <!-- course icon -->
								</div>
								<p class="text-[15px]">
									Course Management
								</p>
							</div>
							<div class="drop-down-right">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
							
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/course-management/course-categories">Course Category</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/course-management/courses">Courses</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/course-management/course-applicants">Course Applicant</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2">
							<div class="flex text-left items-center gap-3 py-4">
								<div>
									<SvgIcons name="education" /> <!-- student icon -->
								</div>
								<p class="text-[15px]">
									Student Management
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons class="ml-2" name="chevron-right" /> <!-- right icon -->
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary"><router-link active-class="active" to="/dashboard/student-management/students">Student</router-link></li>
									<li class="hover:text-primary pb-3"><router-link active-class="active" to="/dashboard/student-management/cohort">Cohort</router-link></li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="talent-management" /> <!-- talent icon -->
								</div>
								<p class="text-left text-[15px]">
									Talent Management
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/talent-management/instructors">Instructors</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/talent-management/talent-pool">Talent Pool</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/talent-management/skills">Skill</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="service-management" /> <!-- service icon -->
								</div>
								<p class="text-left text-[15px]">
									Service Management
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/service-management/projects">Project</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/service-management/outsourcing">Outsourcing</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/service-management/consultancy">Consultancy</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="user-management" /> <!-- user icon -->
								</div>
								<p class="text-left text-[15px]">
									User Management
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/user-management/users">Users</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/user-management/roles">Roles (Permission)</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/#enumeration">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="enumeration" /> <!-- enumeration icon -->
							</div>
							<p class="text-[15px]">
								Enumeration
							</p>
						</div>
					</a>
				</li>
				<li>
					<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/payments">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="payment" /> <!-- enumeration icon -->
							</div>
							<p class="text-[15px]">
								Payment
							</p>
						</div>
					</a>
				</li>
				<!-- <li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="account-management" />
								</div>
								<p class="text-left text-[15px]">
									Payment
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons name="payment" />
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/account-management/revenue">Revenue</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/account-management/expenditure">Expenditure</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/account-management/income-statement">Income Statement</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/account-management/payroll">Payroll</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li> -->
				<!-- <li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="user-group" />
								</div>
								<p class="text-left text-[15px]">
									HR Department
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons name="chevron-right" />
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/employee-data">Employee Data</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/employee-birthday">Employee Birthday</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/employee-portal">Employee Portal</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/human-resource/leave-management">Leave Management</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/recruitment">Recruitment</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/performance-management">Performance Management</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/human-resource/payroll">Payroll</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li> -->
				<li>
					<router-link active-class="active" class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" to="/dashboard/department">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="department" />  <!-- department icon -->
							</div>
							<p class="text-[15px]">
								Department
							</p>
						</div>
					</router-link>
				</li>
				<li>
					<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/contact-us">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="contact" /> <!-- contact icon -->
							</div>
							<p class="text-[15px]">
								Contact Us
							</p>
						</div>
					</a>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="ipos" /> <!-- ipos icon -->
								</div>
								<p class="text-[15px]">
									Ipos
								</p>
							</div>
							<div class="drop-down-right flex justify-end">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>

							<div class="drop-down-icon">
								<SvgIcons name="chevron-down" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/ipos/contact-us">Contact Us</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/ipos/demo-request">Demo Requests</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/ipos/quote-request">Quote Requests</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
    .dropdown:focus-within .dropdown-menu {
    display: block !important;
    transform: translate(0) scale(1);
    visibility: visible;
    }
	.dropdown:focus-within .drop-down-right {
		visibility: hidden;
    }
	.drop-down-icon {
		visibility: hidden;
	}
	.dropdown:focus-within .drop-down-icon {
		visibility: visible;
    }
	.active {
		@apply text-primary;
	}
</style>