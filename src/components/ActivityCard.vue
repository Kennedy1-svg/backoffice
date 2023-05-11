<script lang="ts">
export default {
  name: 'ActivityCard',
}
</script>

<script setup lang="ts">
</script>

<template>
     <div class="main border lg:p-10 rounded-md bg-white shadow-xl p-3">
        <div class="top lg:flex justify-between items-center block">
            <p class="font-bold pb-5 text-[19px] text-center text-sm ">
                <slot name="title">
                    Course Applicant
                </slot>
            </p>
            <p class="lg:text-sm text-purple-600 text-center text-xs">
                <slot name="button">
                    <router-link to="/dashboard/course-management/course-applicants">
                        View All
                    </router-link>
                </slot>
            </p>
        </div>
        <div class="overflow-auto">
            <slot name="activity">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Femi Farewa
                            </td>
                            <td>
                                React Js Algorithm Essay
                            </td>
                            <td>
                                <span class="text-yellow-500 py-2 px-3">
                                    Pending
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </slot>
        </div>
    </div>
</template>
