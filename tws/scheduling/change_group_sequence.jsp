<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="window_update_group_sequence" class="x-hidden">
	<table style=" width : 100%; height: 100%; border: none;">
		<tr style="height: 25px;">
			<td>分组</td>
			<td>
				<select id="select-groupname" onchange="UpdateSeq.groupname_onchange.call(UpdateSeq)" onclick="UpdateSeq.groupname_onclick.call(UpdateSeq)" style="width: 200;">
				</select>
			</td>
			<td>
			</td>
		</tr>
		<tr style="height: 175px;">
			<td></td>
			<td>
				<select id="select-group-sequence" multiple="multiple" style="width: 200; height: 90%" >
				</select>
			</td>
			<td align="left">
				<img alt="置顶" class="tiny-botton" src="${pageContext.request.contextPath}/img/menu/plain/up.png" onclick="UpdateSeq._moveTop.call(UpdateSeq)"><br/>
				<img alt="上移" class="tiny-botton" src="${pageContext.request.contextPath}/img/menu/plain/up-full.png" onclick="UpdateSeq._moveUp.call(UpdateSeq)"><br/>
				<img alt="下移" class="tiny-botton" src="${pageContext.request.contextPath}/img/menu/plain/down-full.png" onclick="UpdateSeq._moveDown.call(UpdateSeq)"><br/>
				<img alt="置底" class="tiny-botton" src="${pageContext.request.contextPath}/img/menu/plain/down.png" onclick="UpdateSeq._moveBottom.call(UpdateSeq)"><br/>
			</td>
		</tr>
		<tr style="height: 25px;">
			<td colspan="3" id="td-update-group-sequence-msg"></td>
		</tr>
	</table>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/multiSelect.js"></script>
